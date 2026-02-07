FROM php:8.4-fpm-alpine

# 1. System dependencies
RUN apk add --no-cache git curl libpng-dev oniguruma-dev libxml2-dev zip unzip nginx postgresql-dev nodejs npm

# 2. PHP extensions
RUN docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd

# 3. Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Sabse pehle sirf composer files copy karenge
COPY composer.json composer.lock ./

# Yahan hum purana koi bhi vendor folder delete karke fresh install karenge
RUN composer install --no-dev --no-scripts --no-autoloader --ignore-platform-reqs

# Ab baaki project files copy karenge
COPY . .

# Final optimization and cleanup
RUN rm -rf vendor/symfony/polyfill-php84 # Khass karke is file ko delete kar rahe hain jo error de rahi thi
RUN composer dump-autoload --optimize --ignore-platform-reqs

# 4. Frontend build
RUN npm install && npm run build

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 80

CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=80
