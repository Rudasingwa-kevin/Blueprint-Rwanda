# Backend Skeleton

This folder is a Laravel-oriented implementation scaffold for converting the static Blueprint Rwanda site into a production-grade full-stack application.

## Current state
- The repo is still front-end only.
- PHP and Composer are not currently available on the active shell PATH.
- These files define the implementation target so the project can proceed immediately once the runtime is available.

## Intended final runtime
- Laravel 12
- PHP 8.3+
- PostgreSQL
- Redis
- Sanctum
- S3-compatible object storage

## Suggested bootstrap command
Run this from the project root once PHP and Composer are available:

```bash
composer create-project laravel/laravel backend-app
```

Then move the stubs in this folder into the generated app or copy their contents into the matching Laravel files.

## Front-end layout
- `frontend/pages/`: live static pages
- `frontend/assets/images/`: active images grouped by purpose
- `frontend/assets/js/`: shared front-end wiring helpers
- `legacy/snapshots/`: previous iterations preserved for reference

## Folder contents
- `routes/api.php.stub`: target API route map
- `routes/web.php.stub`: session and SPA/static page route notes
- `.env.example`: production-safe config template
- `database/migrations/README.md`: ordered migration plan
- `openapi.yaml`: API contract starter
