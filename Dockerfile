FROM php:8.2-fpm

# 1. Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx \
    libpq-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Install PHP extensions
RUN docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd

# 3. Get Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Set Working Directory
WORKDIR /var/www
COPY . .

# 5. Build Backend
RUN composer install --no-dev --optimize-autoloader --no-interaction

# 6. Build Frontend (React/Vite)
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs
RUN npm install && npm run build

# 7. Permissions (Sabse zaroori)
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# 8. Render Port
EXPOSE 80

# 9. Start Command
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=80
