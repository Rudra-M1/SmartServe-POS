<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\POSController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

Route::get('/pos', [POSController::class, 'index'])->name('pos');
Route::post('/pos/checkout', [POSController::class, 'store'])->name('pos.checkout');

Route::resource('products', ProductController::class);
Route::resource('customers', CustomerController::class);