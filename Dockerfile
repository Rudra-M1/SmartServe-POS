FROM php:8.4-fpm-alpine

# 1. System dependencies
RUN apk add --no-cache git curl libpng-dev oniguruma-dev libxml2-dev zip unzip nginx postgresql-dev nodejs npm

# 2. PHP extensions
RUN docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd

# 3. Composer setup
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

# 4. Backend Build - Fresh start
RUN rm -rf vendor composer.lock
RUN composer install --no-dev --optimize-autoloader --no-interaction --ignore-platform-reqs

# 5. Frontend Build - Sabse important fixes yahan hain
RUN rm -rf node_modules package-lock.json
RUN npm install
# Permission fix: Vite ko chalne ki ijazat dena
RUN chmod +x node_modules/.bin/vite
RUN npm run build

# 6. Permissions set karo
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

EXPOSE 80

CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=80
