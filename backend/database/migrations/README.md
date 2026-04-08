# Migration Plan

Create migrations in this order:

1. `create_users_table`
2. `create_user_profiles_table`
3. `create_cache_tables`
4. `create_jobs_tables`
5. `create_listings_table`
6. `create_listing_images_table`
7. `create_accommodation_details_table`
8. `create_car_details_table`
9. `create_place_details_table`
10. `create_bookings_table`
11. `create_reviews_table`
12. `create_favorites_table`
13. `create_contact_messages_table`
14. `create_activity_logs_table`
15. `create_audit_logs_table`

## Naming conventions
- Tables: plural snake_case
- Foreign keys: `{table_singular}_id`
- Indexes: `{table}_{columns}_index`
- Unique constraints: `{table}_{columns}_unique`

## Zero-downtime rules
- Prefer additive migrations first
- Backfill data before applying `NOT NULL` on existing columns
- Do not drop columns in the same deployment where code still references them

