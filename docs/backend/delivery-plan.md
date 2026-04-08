# Delivery Plan

## Phase 1: Foundation
Scope:
- Bootstrap Laravel app
- Configure PostgreSQL, Redis, mail, storage
- Add auth scaffolding and Sanctum
- Configure staging and production environments

Acceptance criteria:
- App boots locally and in staging
- Register, login, logout, verification, forgot/reset password all work
- Health endpoint and queue worker run successfully

## Phase 2: Core data and public catalog
Scope:
- Create core schema
- Seed realistic demo data
- Implement public listings, search, and detail endpoints
- Replace static listing/detail mocks with API-backed reads

Acceptance criteria:
- `accommodation.html`, `rentcar.html`, `visit.html`, `search.html`, and `item-details.html` render API data
- Pagination, filtering, and sorting work
- Public endpoints are rate-limited and validated

## Phase 3: Explorer flows
Scope:
- Profile endpoints
- Favorites
- Bookings
- Reviews

Acceptance criteria:
- Verified explorers can create bookings
- Explorers can view and cancel eligible bookings
- Reviews are persisted and reflected in listing aggregates

## Phase 4: Owner workspace
Scope:
- Owner listing CRUD
- Image uploads
- Owner booking inbox
- Owner dashboard metrics

Acceptance criteria:
- Owners can create, edit, hide, and soft-delete their own listings only
- Owners can see and manage bookings for their own listings only
- Upload validation and storage policies are enforced

## Phase 5: Admin operations
Scope:
- Admin user management
- Listing moderation
- Review moderation
- Dashboard reporting
- Contact inbox

Acceptance criteria:
- Admin can manage users, listings, bookings, reviews, and messages
- All admin mutations create audit entries
- Dashboard metrics are DB-backed, not browser-local

## Phase 6: Hardening and release
Scope:
- Tests
- Static analysis
- Security headers and rate limits
- CI/CD
- Monitoring, backups, rollback

Acceptance criteria:
- CI passes lint, static analysis, unit, feature, and smoke tests
- Staging release is stable
- Backup and rollback runbooks are verified

## Definition of Done
- No business state depends on `localStorage`
- All protected actions are enforced server-side
- All environments use HTTPS and secret-managed credentials
- Migrations are repeatable and documented
- Critical flows are covered by automated tests
- Admin actions are auditable
- Monitoring, backups, and rollback procedures are documented and tested

