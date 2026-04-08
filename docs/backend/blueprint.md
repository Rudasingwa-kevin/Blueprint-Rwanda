# Blueprint Rwanda Full-Stack Blueprint

## Assumptions
- The existing UI in `frontend/pages/` remains visually unchanged.
- The current pages define the initial product scope: public catalog, item details, auth, bookings, reviews, user profile, owner dashboard, and admin dashboard.
- User roles are `admin`, `owner`, and `explorer`.
- Email verification and password reset are required for production.
- Payments are out of scope for v1 because the current UI models reservation requests rather than checkout.
- The application is deployed to separate `staging` and `production` environments over HTTPS.

## Recommended stack
- Framework: Laravel 12
- Runtime: PHP 8.3+
- Database: PostgreSQL 16
- Cache and queue: Redis
- Auth: Laravel Sanctum with secure session cookies
- ORM: Eloquent
- Storage: S3-compatible object storage
- Email: Postmark or Amazon SES
- Web server: Nginx + PHP-FPM

## Domain model

### Core entities
- `users`
- `user_profiles`
- `listings`
- `listing_images`
- `accommodation_details`
- `car_details`
- `place_details`
- `bookings`
- `reviews`
- `favorites`
- `contact_messages`
- `activity_logs`
- `audit_logs`

### Roles
- `admin`: full platform control
- `owner`: manages own listings and booking inbox
- `explorer`: books, reviews, favorites, profile updates

## Schema

### users
| Column | Type | Notes |
|---|---|---|
| id | uuid pk | primary key |
| name | varchar(120) | required |
| email | varchar(190) unique | lowercase, normalized |
| password | varchar(255) | Argon2id hash |
| role | varchar(20) | `admin`, `owner`, `explorer` |
| status | varchar(20) | `active`, `pending`, `suspended` |
| avatar_path | varchar(255) nullable | object storage path |
| email_verified_at | timestamp nullable | email verification |
| last_login_at | timestamp nullable | security visibility |
| created_at / updated_at | timestamps | |
| deleted_at | soft delete | optional recovery |

Indexes:
- unique `users_email_unique(email)`
- index `users_role_status_index(role, status)`

### user_profiles
| Column | Type | Notes |
|---|---|---|
| user_id | uuid pk fk -> users.id | one-to-one |
| phone | varchar(30) nullable | E.164 preferred |
| city | varchar(120) nullable | |
| bio | text nullable | |
| member_since | date nullable | |
| preferences | jsonb nullable | saved filters, UI prefs |
| created_at / updated_at | timestamps | |

### listings
| Column | Type | Notes |
|---|---|---|
| id | uuid pk | |
| owner_id | uuid fk -> users.id | owner only |
| type | varchar(20) | `accommodation`, `car`, `place` |
| slug | varchar(190) unique | public identifier |
| title | varchar(150) | |
| summary | varchar(255) nullable | card summary |
| description | text | |
| status | varchar(20) | `draft`, `pending`, `active`, `inactive`, `rejected` |
| city | varchar(120) | |
| location_name | varchar(150) nullable | |
| address | varchar(255) nullable | |
| latitude | decimal(10,7) nullable | |
| longitude | decimal(10,7) nullable | |
| base_price | numeric(12,2) | |
| currency | char(3) | default `RWF` or `USD`, pick one per env |
| rating_avg | numeric(3,2) default 0 | cached aggregate |
| reviews_count | integer default 0 | cached aggregate |
| created_at / updated_at | timestamps | |
| deleted_at | soft delete | |

Indexes:
- unique `listings_slug_unique(slug)`
- index `listings_type_status_index(type, status)`
- index `listings_owner_status_index(owner_id, status)`
- index `listings_city_index(city)`

### listing_images
| Column | Type | Notes |
|---|---|---|
| id | uuid pk | |
| listing_id | uuid fk -> listings.id | |
| path | varchar(255) | object storage path |
| alt_text | varchar(255) nullable | |
| sort_order | integer default 0 | |
| is_primary | boolean default false | |
| created_at / updated_at | timestamps | |

### accommodation_details
| Column | Type | Notes |
|---|---|---|
| listing_id | uuid pk fk -> listings.id | |
| property_type | varchar(80) nullable | apartment, lodge |
| cleaning_fee | numeric(12,2) default 0 | |
| min_nights | integer default 1 | |
| max_nights | integer nullable | |
| check_in_time | time nullable | |
| check_out_time | time nullable | |
| guests | integer nullable | |
| bedrooms | integer nullable | |
| beds | integer nullable | |
| bathrooms | numeric(4,1) nullable | |
| amenities | jsonb nullable | |
| policy | varchar(80) nullable | |
| created_at / updated_at | timestamps | |

### car_details
| Column | Type | Notes |
|---|---|---|
| listing_id | uuid pk fk -> listings.id | |
| brand | varchar(80) nullable | |
| model | varchar(80) nullable | |
| vehicle_type | varchar(80) nullable | SUV, sedan |
| seats | integer nullable | |
| transmission | varchar(30) nullable | |
| fuel_type | varchar(30) nullable | |
| year | integer nullable | |
| created_at / updated_at | timestamps | |

### place_details
| Column | Type | Notes |
|---|---|---|
| listing_id | uuid pk fk -> listings.id | |
| category | varchar(80) nullable | |
| duration_hours | integer nullable | |
| activities | jsonb nullable | |
| meeting_point | varchar(255) nullable | |
| created_at / updated_at | timestamps | |

### bookings
| Column | Type | Notes |
|---|---|---|
| id | uuid pk | |
| listing_id | uuid fk -> listings.id | |
| user_id | uuid fk -> users.id | explorer |
| owner_id | uuid fk -> users.id | denormalized for inbox |
| start_date | date | |
| end_date | date | derived from days |
| days | integer | minimum 1 |
| guests_count | integer nullable | |
| special_requests | text nullable | |
| status | varchar(20) | `pending`, `confirmed`, `cancelled`, `completed`, `rejected` |
| total_amount | numeric(12,2) nullable | optional in v1 |
| created_at / updated_at | timestamps | |

Indexes:
- index `bookings_user_status_index(user_id, status)`
- index `bookings_owner_status_index(owner_id, status)`
- index `bookings_listing_start_date_index(listing_id, start_date)`

### reviews
| Column | Type | Notes |
|---|---|---|
| id | uuid pk | |
| listing_id | uuid fk -> listings.id | |
| user_id | uuid fk -> users.id | |
| booking_id | uuid nullable fk -> bookings.id | enforce verified stays later |
| body | text | |
| security_score | smallint nullable | 1-5 |
| cleanliness_score | smallint nullable | 1-5 |
| comfort_score | smallint nullable | 1-5 |
| location_score | smallint nullable | 1-5 |
| value_score | smallint nullable | 1-5 |
| average_score | numeric(3,2) | computed |
| status | varchar(20) | `pending`, `published`, `hidden` |
| created_at / updated_at | timestamps | |
| deleted_at | soft delete | |

Indexes:
- index `reviews_listing_status_index(listing_id, status)`
- index `reviews_user_index(user_id)`

### favorites
| Column | Type | Notes |
|---|---|---|
| user_id | uuid fk -> users.id | |
| listing_id | uuid fk -> listings.id | |
| created_at | timestamp | |

Constraints:
- unique composite `(user_id, listing_id)`

### contact_messages
| Column | Type | Notes |
|---|---|---|
| id | uuid pk | |
| name | varchar(120) | |
| email | varchar(190) | |
| subject | varchar(180) | |
| message | text | |
| status | varchar(20) | `new`, `read`, `closed`, `spam` |
| created_at / updated_at | timestamps | |

## API overview
- Prefix: `/api/v1`
- Auth: session cookie + CSRF via Sanctum
- Pagination: `page`, `per_page` default `12`, max `100`
- Sorting: `sort=created_at,-base_price,rating_avg`
- Public rate limit: `60/min/ip`
- Authenticated rate limit: `120/min/user`
- Auth endpoints: `10/min/ip`

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`
- `POST /api/v1/auth/email/verification-notification`
- `GET /api/v1/auth/verify-email/{id}/{hash}`

### Public catalog
- `GET /api/v1/listings`
- `GET /api/v1/listings/featured`
- `GET /api/v1/listings/{slug}`
- `GET /api/v1/listings/{listing}/reviews`
- `POST /api/v1/contact-messages`

### Explorer
- `GET /api/v1/profile`
- `PATCH /api/v1/profile`
- `GET /api/v1/profile/favorites`
- `POST /api/v1/profile/favorites`
- `DELETE /api/v1/profile/favorites/{listing}`
- `POST /api/v1/bookings`
- `GET /api/v1/bookings/me`
- `GET /api/v1/bookings/{booking}`
- `PATCH /api/v1/bookings/{booking}/cancel`
- `POST /api/v1/listings/{listing}/reviews`

### Owner
- `GET /api/v1/owner/listings`
- `POST /api/v1/owner/listings`
- `GET /api/v1/owner/listings/{listing}`
- `PATCH /api/v1/owner/listings/{listing}`
- `DELETE /api/v1/owner/listings/{listing}`
- `POST /api/v1/owner/listings/{listing}/images`
- `DELETE /api/v1/owner/listings/{listing}/images/{image}`
- `GET /api/v1/owner/bookings`
- `PATCH /api/v1/owner/bookings/{booking}`

### Admin
- `GET /api/v1/admin/dashboard`
- `GET /api/v1/admin/users`
- `POST /api/v1/admin/users`
- `PATCH /api/v1/admin/users/{user}`
- `DELETE /api/v1/admin/users/{user}`
- `GET /api/v1/admin/listings`
- `PATCH /api/v1/admin/listings/{listing}`
- `GET /api/v1/admin/bookings`
- `GET /api/v1/admin/reviews`
- `DELETE /api/v1/admin/reviews/{review}`
- `GET /api/v1/admin/contact-messages`
- `PATCH /api/v1/admin/contact-messages/{contactMessage}`

## Security defaults
- Password hashing: Argon2id
- Verification required before booking, reviewing, or publishing owner listings
- CSRF enabled for state-changing requests
- CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, frame protections
- File uploads restricted by MIME, extension, size, and image re-encoding
- Strict same-origin CORS in production
- Audit logging for admin mutations and booking state transitions

## Front-end mapping to current pages
- `frontend/pages/verification.html`: register, login, forgot/reset password
- `frontend/pages/accommodation.html`, `frontend/pages/rentcar.html`, `frontend/pages/visit.html`, `frontend/pages/search.html`: catalog endpoints
- `frontend/pages/item-details.html`: listing detail + reviews + booking CTA auth guard
- `frontend/pages/book-item.html`: create booking
- `frontend/pages/my-bookings.html`, `frontend/pages/profile.html`: current user data
- `frontend/pages/user-dashboard.html`, `frontend/pages/user-add-item.html`, `frontend/pages/add-accommodation.html`: owner CRUD
- `frontend/pages/admin-dashboard.html`, `frontend/pages/admin-users.html`, `frontend/pages/admin-accommodations.html`, `frontend/pages/admin-cars.html`, `frontend/pages/admin-places.html`: admin APIs

## Migration order
1. users
2. user_profiles
3. cache/session/job tables
4. listings
5. listing_images
6. accommodation_details
7. car_details
8. place_details
9. bookings
10. reviews
11. favorites
12. contact_messages
13. activity_logs
14. audit_logs

## Seed plan
- Admin seed: one platform admin
- Owner seed: 3 owners with sample listings
- Explorer seed: 10 demo users
- Listing seed: 4 accommodations, 4 cars, 4 places
- Booking seed: pending, confirmed, cancelled examples
- Review seed: published reviews with realistic scores
