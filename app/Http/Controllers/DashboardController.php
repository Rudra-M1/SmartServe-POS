<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'totalSales' => Sale::sum('total_amount'),
                'newCustomers' => Customer::count(),
                'pendingBills' => Sale::where('status', 'pending')->count(),
                'growth' => 12.5,
            ],
            'recentSales' => Sale::with('customer')->latest()->take(5)->get()->map(function ($sale) {
                return [
                    'id' => $sale->id,
                    'customer' => $sale->customer ? $sale->customer->name : 'Guest',
                    'amount' => $sale->total_amount,
                    'time' => $sale->created_at->diffForHumans(),
                ];
            }),
        ]);
    }
}
