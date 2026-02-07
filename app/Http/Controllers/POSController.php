<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class POSController extends Controller
{
    public function index()
    {
        return Inertia::render('POS', [
            'products' => Product::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cart' => 'required|array',
            'cart.*.id' => 'required|exists:products,id',
            'cart.*.quantity' => 'required|integer|min:1',
            'cart.*.price' => 'required|numeric',
        ]);

        DB::transaction(function () use ($validated) {
            $subTotal = collect($validated['cart'])->sum(fn($item) => $item['price'] * $item['quantity']);
            $tax = $subTotal * 0.10; // 10% Tax
            $totalAmount = $subTotal + $tax;

            $sale = Sale::create([
                'sub_total' => $subTotal,
                'tax' => $tax,
                'total_amount' => $totalAmount,
                'status' => 'completed',
                'customer_id' => null, // For guest checkout
            ]);

            foreach ($validated['cart'] as $item) {
                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
                
                // Decrement stock
                Product::where('id', $item['id'])->decrement('stock', $item['quantity']);
            }
        });

        return redirect()->route('pos')->with('success', 'Sale completed successfully!');
    }
}
