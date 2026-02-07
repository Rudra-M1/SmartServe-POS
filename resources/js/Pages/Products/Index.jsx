import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Card from '@/Components/Card';
import { Head } from '@inertiajs/react';

export default function Index({ products = [] }) {
    return (
        <MainLayout>
            <Head title="Products" />

            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                    <p className="text-gray-500">Manage your product inventory.</p>
                </div>
            </div>

            <Card className="overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={product.image || 'https://via.placeholder.com/150'} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                        <span className="font-semibold text-gray-800">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-700">
                                    ${Number(product.price).toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {product.stock} in stock
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No products found.
                    </div>
                )}
            </Card>
        </MainLayout>
    );
}
