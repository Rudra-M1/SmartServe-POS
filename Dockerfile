FROM php:8.4-apache

# 1. System Dependencies install karna
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip libpq-dev nodejs npm \
    && a2enmod rewrite

# 2. PHP Extensions
RUN docker-php-ext-install pdo_pgsql mbstring

# 3. Apache Config (Directly pointing to PUBLIC folder)
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 4. Composer setup
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Environment variables force karna build ke waqt
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV DB_CONNECTION=pgsql

# 5. Project Files Copy karna
COPY . .

# 6. Fresh Clean & Build (Assets build confirm karna)
# Hum 'public/hot' file delete kar rahe hain taaki Vite dev mode mein na jaye
RUN rm -rf vendor node_modules public/build public/hot
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs
RUN npm install && npm run build

# 7. Permissions set karna
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80

# 8. Optimized Start Command
# Sabse pehle cache clear, phir migrate, phir server start
CMD php artisan config:clear && \
    php artisan route:clear && \
    php artisan view:clear && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    php artisan migrate --force && \
    apache2-foreground
