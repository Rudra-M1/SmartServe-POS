import React from 'react';
import Sidebar from '@/Components/Sidebar';
import TopBar from '@/Components/TopBar';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
            {/* Background decorative blobs */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
            <div className="fixed -bottom-32 left-20 w-[600px] h-[600px] bg-pink-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>

            <Sidebar />
            <TopBar />

            <main className="md:ml-64 pt-24 px-8 pb-8 relative z-10">
                {children}
            </main>
        </div>
    );
}
