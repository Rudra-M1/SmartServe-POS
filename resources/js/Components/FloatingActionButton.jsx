import React from 'react';
import { Plus } from 'lucide-react';

export default function FloatingActionButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-2xl z-50 group"
        >
            <Plus className="w-8 h-8 transition-transform duration-300 group-hover:rotate-90" />
        </button>
    );
}
