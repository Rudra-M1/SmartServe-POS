FROM php:8.4-apache

# 1. Install System Dependencies
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip libpq-dev nodejs npm \
    && a2enmod rewrite

# 2. PHP Extensions
RUN docker-php-ext-install pdo_pgsql mbstring

# 3. Apache Config (White Screen Fix)
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 4. Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

# Force Laravel to use Postgres and Production Mode
ENV DB_CONNECTION=pgsql
ENV APP_ENV=production
ENV APP_DEBUG=false

# 5. Clean & Build
RUN rm -rf vendor node_modules
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs
RUN npm install && npm run build

# 6. Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80

# 7. Start Command
# Migration ke baad cache clear karna zaroori hai
CMD php artisan migrate --force && php artisan config:cache && php artisan route:cache && php artisan view:cache && apache2-foreground
