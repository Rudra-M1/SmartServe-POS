#!/usr/bin/env bash
# Exit on error
set -o errexit

composer install --no-dev --optimize-autoloader
npm install
npm run build

php artisan migrate --force
