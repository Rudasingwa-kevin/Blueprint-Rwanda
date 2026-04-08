# Operations and Security

## Environment strategy
- `local`: developer machines
- `staging`: production-like validation environment
- `production`: customer-facing environment

## CI pipeline
1. Install PHP dependencies
2. Run Pint
3. Run PHPStan or Larastan
4. Run unit and feature tests
5. Build front-end assets if introduced later
6. Publish deployment artifact

## Deployment flow
1. Deploy code to new release directory
2. Install dependencies with optimized autoload
3. Run migrations
4. Cache config, routes, and views
5. Restart PHP-FPM and queue workers
6. Run smoke tests
7. Switch traffic

## Observability
- Structured application logs
- Centralized error tracking
- DB slow query monitoring
- Queue failure alerts
- HTTP uptime checks

## Backup policy
- Daily full logical backup of PostgreSQL
- Point-in-time recovery if managed DB supports it
- Object storage versioning enabled
- Quarterly restore drill

## Security checklist
- TLS only
- HSTS enabled
- Secure, HttpOnly, SameSite cookies
- CSRF protection for all state-changing session requests
- CSP and strict security headers
- Least-privilege DB and storage credentials
- Brute-force protection on auth endpoints
- Audit logs for admin and moderation actions
- Dependency vulnerability scanning

