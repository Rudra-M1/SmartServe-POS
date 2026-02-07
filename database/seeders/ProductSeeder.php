<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Premium Coffee', 'price' => 12.50, 'stock' => 50, 'category' => 'Beverages', 'image' => 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80'],
            ['name' => 'Fresh Croissant', 'price' => 5.00, 'stock' => 30, 'category' => 'Bakery', 'image' => 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80'],
            ['name' => 'Avocado Toast', 'price' => 15.00, 'stock' => 20, 'category' => 'Breakfast', 'image' => 'https://images.unsplash.com/photo-1588137372308-15f75323a4dd?auto=format&fit=crop&w=300&q=80'],
            ['name' => 'Berry Smoothie', 'price' => 8.50, 'stock' => 40, 'category' => 'Beverages', 'image' => 'https://images.unsplash.com/photo-1553530666-ba11a9069727?auto=format&fit=crop&w=300&q=80'],
            ['name' => 'Chocolate Cake', 'price' => 7.00, 'stock' => 15, 'category' => 'Bakery', 'image' => 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80'],
            ['name' => 'Veggie Salad', 'price' => 11.00, 'stock' => 25, 'category' => 'Lunch', 'image' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80'],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
