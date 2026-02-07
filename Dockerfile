# Seedha PHP 8.4 Alpine (Halki aur fast image) use kar rahe hain
FROM php:8.4-fpm-alpine

# 1. System dependencies install karo (Alpine version)
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx \
    postgresql-dev \
    nodejs \
    npm

# 2. PHP extensions install karo
RUN docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd

# 3. Composer copy karo
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

# 4. Backend build (Sare requirements ignore karke)
RUN composer install --no-dev --optimize-autoloader --no-interaction --ignore-platform-reqs

# 5. Frontend build
RUN npm install && npm run build

# 6. Permissions set karo
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 80

# 7. Start command
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=80
