FROM php:8.4-fpm-alpine

RUN apk add --no-cache git curl libpng-dev oniguruma-dev libxml2-dev zip unzip nginx postgresql-dev nodejs npm

RUN docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

# Backend build
RUN rm -rf vendor composer.lock
RUN composer install --no-dev --optimize-autoloader --no-interaction --ignore-platform-reqs

# Frontend build
RUN rm -rf node_modules package-lock.json
RUN npm install
RUN chmod +x node_modules/.bin/vite
RUN npm run build

# PERMISSIONS FIX (Sabse zaroori white screen ke liye)
RUN chmod -R o+w storage bootstrap/cache
RUN chown -R www-data:www-data /var/www

EXPOSE 80

# Serve from PUBLIC folder
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=80
