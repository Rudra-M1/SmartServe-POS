<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /**
         * Render (Production) par HTTPS force karne ke liye ye zaroori hai.
         * Isse Mixed Content (HTTP vs HTTPS) ka error khatam ho jata hai.
         */
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }
    }
}
