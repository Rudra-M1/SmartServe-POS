import React from 'react';

export default function Button({ children, onClick, variant = 'primary', className = '' }) {
    const baseStyle = "px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md transform hover:-translate-y-0.5 active:scale-95";
    const variants = {
        primary: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30",
        secondary: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-red-500/30",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}
