FROM php:8.2-fpm

# System dependencies install kar rahe hain (libpq-dev add kar diya hai)
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx \
    libpq-dev

# PHP extensions (Ab ye error nahi dega)
RUN docker-php-ext-install pdo_pgsql mbstring

# Composer setup
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

# Dependencies aur Build
RUN composer install --no-dev --optimize-autoloader
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs
RUN npm install && npm run build

# Permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 80

# Start command
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=80
