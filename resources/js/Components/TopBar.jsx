import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

export default function TopBar({ user }) {
    return (
        <header className="fixed top-0 right-0 left-0 md:left-64 h-20 bg-white/40 backdrop-blur-lg border-b border-white/20 z-30 px-8 flex items-center justify-between">
            <div className="flex items-center bg-white/50 rounded-full px-4 py-2 border border-white/20 w-96 shadow-sm focus-within:shadow-md transition-shadow">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search anything..."
                    className="bg-transparent border-none outline-none ml-3 text-sm text-gray-600 w-full placeholder-gray-400"
                />
            </div>

            <div className="flex items-center space-x-6">
                <button className="relative bg-white/60 p-2 rounded-full hover:bg-white transition-colors shadow-sm">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-3 bg-white/60 pl-2 pr-4 py-1.5 rounded-full border border-white/40 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                    <img
                        src="https://ui-avatars.com/api/?name=Admin+User&background=random"
                        alt="User"
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="hidden md:block text-left">
                        <p className="text-sm font-semibold text-gray-700 leading-tight">Admin User</p>
                        <p className="text-xs text-gray-500">Super Admin</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
            </div>
        </header>
    );
}
