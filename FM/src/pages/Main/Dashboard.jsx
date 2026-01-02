import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Calendar, Bell, Plus, ArrowUpRight, ArrowDownRight, Menu, X, Home, Users, Clock, Settings, LogOut, PieChart } from 'lucide-react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data
  const summaryData = {
    totalBalance: 15420.50,
    monthlyIncome: 8500.00,
    monthlyExpenses: 4230.75,
    currency: 'USD'
  };

  const recentTransactions = [
    { id: 1, description: 'Salary Payment', category: 'Income', amount: 5000, type: 'income', date: '2026-01-02' },
    { id: 2, description: 'Grocery Shopping', category: 'Food', amount: -125.50, type: 'expense', date: '2026-01-01' },
    { id: 3, description: 'Electric Bill', category: 'Utilities', amount: -89.00, type: 'expense', date: '2025-12-30' },
    { id: 4, description: 'Freelance Project', category: 'Income', amount: 1200, type: 'income', date: '2025-12-28' },
    { id: 5, description: 'Restaurant', category: 'Food', amount: -65.25, type: 'expense', date: '2025-12-27' }
  ];

  const upcomingReminders = [
    { id: 1, title: 'Pay Rent', date: '2026-01-05', type: 'payment' },
    { id: 2, title: 'Submit Monthly Report', date: '2026-01-07', type: 'general' },
    { id: 3, title: 'Credit Card Payment Due', date: '2026-01-10', type: 'bill' }
  ];

  const todaysEvents = [
    { id: 1, title: 'Team Meeting', time: '10:00 AM', category: 'Work' },
    { id: 2, title: 'Lunch with Client', time: '01:00 PM', category: 'Business' }
  ];

  const chartData = [
    { month: 'Aug', income: 7800, expenses: 4200 },
    { month: 'Sep', income: 8200, expenses: 4500 },
    { month: 'Oct', income: 7500, expenses: 3800 },
    { month: 'Nov', income: 8800, expenses: 4600 },
    { month: 'Dec', income: 8500, expenses: 4230 },
    { month: 'Jan', income: 8500, expenses: 4230 }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: summaryData.currency
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const navigation = [
    { name: 'Dashboard', icon: Home, href: '#', current: true },
    { name: 'Transactions', icon: CreditCard, href: '#', current: false },
    { name: 'Groups', icon: Users, href: '#', current: false },
    { name: 'Reminders', icon: Bell, href: '#', current: false },
    { name: 'Calendar', icon: Calendar, href: '#', current: false },
    { name: 'Reports', icon: PieChart, href: '#', current: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-600 to-purple-700 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-white">FinManager</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  item.current
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </nav>

          {/* Bottom Menu */}
          <div className="p-4 border-t border-white/20 space-y-2">
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-4 lg:px-8">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600">
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back! Here's your financial overview</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Balance */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6" />
                </div>
                <TrendingUp className="w-5 h-5 text-white/80" />
              </div>
              <p className="text-white/80 text-sm font-medium mb-1">Total Balance</p>
              <h3 className="text-3xl font-bold">{formatCurrency(summaryData.totalBalance)}</h3>
            </div>

            {/* Monthly Income */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <ArrowUpRight className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">+12.5%</span>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">Monthly Income</p>
              <h3 className="text-3xl font-bold text-gray-800">{formatCurrency(summaryData.monthlyIncome)}</h3>
            </div>

            {/* Monthly Expenses */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <ArrowDownRight className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-xs font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">-8.3%</span>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">Monthly Expenses</p>
              <h3 className="text-3xl font-bold text-gray-800">{formatCurrency(summaryData.monthlyExpenses)}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Chart and Transactions */}
            <div className="lg:col-span-2 space-y-8">
              {/* Income vs Expenses Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Income vs Expenses</h2>
                  <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                  </select>
                </div>
                
                {/* Simple Bar Chart */}
                <div className="space-y-4">
                  {chartData.map((data, index) => {
                    const maxValue = 10000;
                    const incomeWidth = (data.income / maxValue) * 100;
                    const expenseWidth = (data.expenses / maxValue) * 100;
                    
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="font-medium text-gray-600 w-12">{data.month}</span>
                          <div className="flex-1 mx-4 space-y-1">
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full flex items-center justify-end pr-2"
                                  style={{ width: `${incomeWidth}%` }}
                                >
                                  <span className="text-xs text-white font-semibold">{formatCurrency(data.income)}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full flex items-center justify-end pr-2"
                                  style={{ width: `${expenseWidth}%` }}
                                >
                                  <span className="text-xs text-white font-semibold">{formatCurrency(data.expenses)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">Income</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">Expenses</span>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">View All</a>
                </div>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {transaction.type === 'income' ? (
                            <ArrowUpRight className="w-5 h-5 text-green-600" />
                          ) : (
                            <ArrowDownRight className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.category} • {formatDate(transaction.date)}</p>
                        </div>
                      </div>
                      <span className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Reminders and Events */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition flex items-center justify-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add Transaction</span>
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>New Reminder</span>
                  </button>
                </div>
              </div>

              {/* Upcoming Reminders */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Upcoming Reminders</h2>
                  <Bell className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  {upcomingReminders.map((reminder) => (
                    <div key={reminder.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="font-semibold text-gray-800 text-sm">{reminder.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{formatDate(reminder.date)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Events */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Today's Events</h2>
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  {todaysEvents.map((event) => (
                    <div key={event.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="font-semibold text-gray-800 text-sm">{event.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{event.time} • {event.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}