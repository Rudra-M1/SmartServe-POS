import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Card from '@/Components/Card';
import FloatingActionButton from '@/Components/FloatingActionButton';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {
    const { stats = {}, recentSales = [] } = props;
    const kpiData = [
        { label: 'Total Sales', value: `$${Number(stats?.totalSales || 0).toLocaleString()}`, change: '+12.5%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'New Customers', value: (stats?.newCustomers || 0).toString(), change: '+8.2%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Pending Bills', value: (stats?.pendingBills || 0).toString(), change: '-2.1%', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-100' },
        { label: 'Growth', value: `${stats?.growth || 0}%`, change: '+4.5%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
    ];

    return (
        <MainLayout>
            <Head title="Dashboard" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
                <p className="text-gray-500">Welcome back, here's what's happening today.</p>
            </div>

            {/* Floating KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {kpiData.map((item, index) => (
                    <Card key={index} className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{item.label}</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">{item.value}</h3>
                            <span className={`text-xs font-semibold ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                {item.change} from last week
                            </span>
                        </div>
                        <div className={`p-3 rounded-xl ${item.bg}`}>
                            <item.icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area (Placeholder) */}
                <Card className="lg:col-span-2 h-96 flex flex-col justify-center items-center relative overflow-hidden group">
                    <div className="absolute top-4 left-6">
                        <h3 className="text-lg font-bold text-gray-800">Revenue Analytics</h3>
                    </div>
                    {/* Simulated Chart Line */}
                    <div className="w-full px-8 flex items-end justify-between h-48 space-x-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                            <div
                                key={i}
                                style={{ height: `${h}%` }}
                                className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg opacity-80 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-y-105 origin-bottom shadow-lg shadow-blue-500/20"
                            ></div>
                        ))}
                    </div>
                </Card>

                {/* Recent Activity */}
                <Card className="h-96 overflow-y-auto scrollbar-hide">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 sticky top-0 bg-white/90 backdrop-blur-sm py-2 z-10">Recent Activity</h3>
                    <div className="space-y-4">
                        {recentSales.map((sale) => (
                            <div key={sale.id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                    {sale.customer.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-800">New Bill Generated</p>
                                    <p className="text-xs text-gray-500">{sale.time} • {sale.customer}</p>
                                </div>
                                <span className="text-sm font-bold text-gray-700">${Number(sale.amount).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <FloatingActionButton onClick={() => alert('Add New Bill')} />
        </MainLayout>
    );
}
