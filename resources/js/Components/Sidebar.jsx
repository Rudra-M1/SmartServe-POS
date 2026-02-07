import React from 'react';
import { LayoutDashboard, ShoppingCart, Package, Users, Settings, LogOut } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Sidebar() {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/', active: window.location.pathname === '/' },
        { icon: ShoppingCart, label: 'POS', href: '/pos', active: window.location.pathname.startsWith('/pos') },
        { icon: Package, label: 'Products', href: '/products', active: window.location.pathname.startsWith('/products') },
        { icon: Users, label: 'Customers', href: '/customers', active: window.location.pathname.startsWith('/customers') },
        { icon: Settings, label: 'Settings', href: '#', active: false },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-20 md:w-64 bg-white/60 backdrop-blur-xl border-r border-white/20 z-40 transition-all duration-300 flex flex-col">
            <div className="h-20 flex items-center justify-center border-b border-gray-100/50">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Craftix-global
                </div>
            </div>

            <nav className="flex-1 py-8 px-4 space-y-2">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${item.active
                            ? 'bg-white shadow-lg shadow-blue-500/10 text-blue-600'
                            : 'text-gray-500 hover:bg-white/50 hover:text-blue-600'
                            }`}
                    >
                        <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                        <span className="hidden md:block font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100/50">
                <button className="flex items-center space-x-3 text-gray-400 hover:text-red-500 w-full px-4 py-3 rounded-xl transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="hidden md:block font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
