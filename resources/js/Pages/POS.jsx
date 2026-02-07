import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Button from '@/Components/Button';
import Toast from '@/Components/Toast';
import { Search, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Head, router } from '@inertiajs/react';

export default function POS({ products = [] }) {
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    const [showToast, setShowToast] = useState(false);

    const getProductImage = (image) => {
        if (!image) return 'https://placehold.co/400x300?text=No+Image';
        if (image.startsWith('http')) return image;
        return `/storage/${image}`;
    };

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const updateQty = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, qty: Math.max(0, item.qty + delta) };
            }
            return item;
        }).filter(item => item.qty > 0));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (Number(item.price) * item.qty), 0);
    const tax = cartTotal * 0.1;
    const finalTotal = cartTotal + tax;

    const safeProducts = Array.isArray(products) ? products : [];
    const filteredProducts = safeProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    // --- CHECKOUT FUNCTION (Fixed Location) ---
    const handleCheckout = () => {
        if (cart.length === 0) return;

        router.post('/pos/checkout', {
            cart: cart.map(item => ({
                id: item.id,
                quantity: item.qty,
                price: item.price
            })),
            total_amount: finalTotal.toFixed(2),
            tax: tax.toFixed(2),
            sub_total: cartTotal.toFixed(2)
        }, {
            onSuccess: () => {
                setShowToast(true);
                setCart([]);
            }
        });
    };

    return (
        <MainLayout>
            <Head title="POS System" />
            <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6 p-4">

                {/* Left Side: Product Grid */}
                <div className="flex-1 flex flex-col">
                    <div className="mb-6 relative">
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search delicious food..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-2xl border-none shadow-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto pb-20 scrollbar-hide">
                        {filteredProducts.map(product => (
                            <div key={product.id} onClick={() => addToCart(product)} className="bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col border border-gray-100" style={{ minHeight: '320px' }}>
                                <div className="h-48 w-full relative bg-gray-200">
                                    <img
                                        src={getProductImage(product.image)}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=Food'; }}
                                    />
                                </div>
                                <div className="p-6 flex flex-col justify-between flex-grow">
                                    <h4 className="font-black text-gray-800 text-lg leading-tight">{product.name}</h4>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-blue-600 font-black text-2xl">${Number(product.price).toFixed(2)}</span>
                                        <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-lg shadow-blue-200">
                                            <Plus className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Simple Billing Cart */}
                <div className="lg:w-96 flex flex-col">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl flex flex-col h-full overflow-hidden border border-gray-50">
                        <div className="p-8 border-b border-gray-100">
                            <h2 className="text-2xl font-black text-gray-800">Current Order</h2>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center opacity-20">
                                    <ShoppingCart className="w-20 h-20 mb-4" />
                                    <p className="font-bold">No Items Selected</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <img src={getProductImage(item.image)} className="w-12 h-12 rounded-xl object-cover" />
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                                                <p className="text-blue-600 font-bold text-xs">${item.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm">
                                            <button onClick={() => updateQty(item.id, -1)} className="p-1 text-red-400"><Minus className="w-4 h-4" /></button>
                                            <span className="font-black text-sm">{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, 1)} className="p-1 text-green-500"><Plus className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-8 bg-gray-50 border-t border-gray-100">
                            <div className="flex justify-between text-2xl font-black text-gray-900 mb-6">
                                <span>Total (inc. tax)</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={cart.length === 0}
                                className="w-full py-5 text-xl font-black rounded-2xl bg-blue-600 text-white hover:bg-blue-700 shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                PLACE ORDER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showToast && <Toast message="Order Placed Successfully!" type="success" onClose={() => setShowToast(false)} />}
        </MainLayout>
    );
}