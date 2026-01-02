import React, { useState } from 'react';
import { TrendingUp, Plus, X, Edit2, Trash2, Menu, Home, CreditCard, Users, Bell, Settings, LogOut, PieChart, Calendar, Search, Tag, DollarSign, TrendingDown, ShoppingCart, Coffee, Home as HomeIcon, Car, Utensils, Heart, Gamepad2, Book, Zap, Wifi, Phone, Briefcase, GraduationCap, Gift, Plane, Film, Music, Dumbbell, Package } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

export default function Categories() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
    icon: 'ShoppingCart',
    color: 'blue',
    budget: '',
    description: ''
  });

  const categoryIcons = [
    { value: 'ShoppingCart', icon: ShoppingCart, label: 'Shopping' },
    { value: 'Coffee', icon: Coffee, label: 'Food & Drink' },
    { value: 'HomeIcon', icon: HomeIcon, label: 'Home' },
    { value: 'Car', icon: Car, label: 'Transport' },
    { value: 'Utensils', icon: Utensils, label: 'Dining' },
    { value: 'Heart', icon: Heart, label: 'Health' },
    { value: 'Gamepad2', icon: Gamepad2, label: 'Entertainment' },
    { value: 'Book', icon: Book, label: 'Education' },
    { value: 'Zap', icon: Zap, label: 'Utilities' },
    { value: 'Wifi', icon: Wifi, label: 'Internet' },
    { value: 'Phone', icon: Phone, label: 'Phone' },
    { value: 'Briefcase', icon: Briefcase, label: 'Work' },
    { value: 'GraduationCap', icon: GraduationCap, label: 'Learning' },
    { value: 'Gift', icon: Gift, label: 'Gifts' },
    { value: 'Plane', icon: Plane, label: 'Travel' },
    { value: 'Film', icon: Film, label: 'Movies' },
    { value: 'Music', icon: Music, label: 'Music' },
    { value: 'Dumbbell', icon: Dumbbell, label: 'Fitness' },
    { value: 'Package', icon: Package, label: 'Shopping' }
  ];

  const colorOptions = [
    { value: 'blue', label: 'Blue', bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-500' },
    { value: 'purple', label: 'Purple', bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-500' },
    { value: 'green', label: 'Green', bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-500' },
    { value: 'red', label: 'Red', bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-500' },
    { value: 'orange', label: 'Orange', bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-500' },
    { value: 'pink', label: 'Pink', bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-500' },
    { value: 'yellow', label: 'Yellow', bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-500' },
    { value: 'indigo', label: 'Indigo', bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-500' }
  ];

  // Sample categories data
  const allCategories = [
    // Expense Categories
    {
      id: 1,
      name: 'Groceries',
      type: 'expense',
      icon: 'ShoppingCart',
      color: 'green',
      budget: 500,
      spent: 342.50,
      transactionCount: 23,
      description: 'Food and household items'
    },
    {
      id: 2,
      name: 'Dining Out',
      type: 'expense',
      icon: 'Utensils',
      color: 'orange',
      budget: 300,
      spent: 275.80,
      transactionCount: 15,
      description: 'Restaurants and takeout'
    },
    {
      id: 3,
      name: 'Transportation',
      type: 'expense',
      icon: 'Car',
      color: 'blue',
      budget: 200,
      spent: 158.20,
      transactionCount: 12,
      description: 'Gas, parking, and public transit'
    },
    {
      id: 4,
      name: 'Utilities',
      type: 'expense',
      icon: 'Zap',
      color: 'yellow',
      budget: 250,
      spent: 245.00,
      transactionCount: 4,
      description: 'Electricity, water, gas'
    },
    {
      id: 5,
      name: 'Entertainment',
      type: 'expense',
      icon: 'Film',
      color: 'purple',
      budget: 150,
      spent: 142.50,
      transactionCount: 8,
      description: 'Movies, games, streaming'
    },
    {
      id: 6,
      name: 'Healthcare',
      type: 'expense',
      icon: 'Heart',
      color: 'red',
      budget: 200,
      spent: 85.00,
      transactionCount: 3,
      description: 'Medical expenses and prescriptions'
    },
    {
      id: 7,
      name: 'Shopping',
      type: 'expense',
      icon: 'Package',
      color: 'pink',
      budget: 400,
      spent: 523.75,
      transactionCount: 18,
      description: 'Clothing and personal items'
    },
    {
      id: 8,
      name: 'Internet & Phone',
      type: 'expense',
      icon: 'Wifi',
      color: 'indigo',
      budget: 100,
      spent: 95.00,
      transactionCount: 2,
      description: 'Internet and mobile bills'
    },
    // Income Categories
    {
      id: 9,
      name: 'Salary',
      type: 'income',
      icon: 'Briefcase',
      color: 'green',
      budget: 0,
      spent: 4500.00,
      transactionCount: 2,
      description: 'Monthly salary'
    },
    {
      id: 10,
      name: 'Freelance',
      type: 'income',
      icon: 'Briefcase',
      color: 'blue',
      budget: 0,
      spent: 1200.00,
      transactionCount: 5,
      description: 'Freelance projects'
    },
    {
      id: 11,
      name: 'Investments',
      type: 'income',
      icon: 'TrendingUp',
      color: 'purple',
      budget: 0,
      spent: 350.00,
      transactionCount: 3,
      description: 'Investment returns'
    },
    {
      id: 12,
      name: 'Other Income',
      type: 'income',
      icon: 'DollarSign',
      color: 'yellow',
      budget: 0,
      spent: 150.00,
      transactionCount: 2,
      description: 'Miscellaneous income'
    }
  ];

  const expenseCategories = allCategories.filter(c => c.type === 'expense');
  const incomeCategories = allCategories.filter(c => c.type === 'income');

  const totalExpenseBudget = expenseCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalExpenseSpent = expenseCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalIncome = incomeCategories.reduce((sum, cat) => sum + cat.spent, 0);

  const filteredCategories = allCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' ||
                         (activeFilter === 'expense' && category.type === 'expense') ||
                         (activeFilter === 'income' && category.type === 'income');

    return matchesSearch && matchesFilter;
  });

  const getIconComponent = (iconName) => {
    const iconObj = categoryIcons.find(i => i.value === iconName);
    return iconObj ? iconObj.icon : ShoppingCart;
  };

  const getColorConfig = (colorName) => {
    return colorOptions.find(c => c.value === colorName) || colorOptions[0];
  };

  const calculateProgress = (spent, budget) => {
    if (budget === 0) return 0;
    return Math.min((spent / budget) * 100, 100);
  };

  const getProgressColor = (spent, budget) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        type: category.type,
        icon: category.icon,
        color: category.color,
        budget: category.budget.toString(),
        description: category.description
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        type: 'expense',
        icon: 'ShoppingCart',
        color: 'blue',
        budget: '',
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = () => {
    console.log(editingCategory ? 'Update category:' : 'Create category:', formData);
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      console.log('Delete category:', id);
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
                <p className="text-sm text-gray-500">Organize your income and expenses</p>
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

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Total Income</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">${totalIncome.toFixed(2)}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">{incomeCategories.length} categories</p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="bg-red-100 p-2 sm:p-3 rounded-lg">
                  <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Total Expenses</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">${totalExpenseSpent.toFixed(2)}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">of ${totalExpenseBudget.toFixed(2)} budget</p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                  <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">Total Categories</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">{allCategories.length}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">{expenseCategories.length} expense • {incomeCategories.length} income</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 mb-6">
            <div className="flex flex-col space-y-4">
              <div className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search categories..."
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex bg-gray-100 rounded-lg p-1 flex-1 sm:flex-initial">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeFilter === 'all'
                        ? 'bg-white text-gray-800 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter('expense')}
                    className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeFilter === 'expense'
                        ? 'bg-white text-gray-800 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Expenses
                  </button>
                  <button
                    onClick={() => setActiveFilter('income')}
                    className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeFilter === 'income'
                        ? 'bg-white text-gray-800 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Income
                  </button>
                </div>

                <button
                  onClick={() => handleOpenModal()}
                  className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>New Category</span>
                </button>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredCategories.length === 0 ? (
              <div className="col-span-full text-center py-8 sm:py-12">
                <div className="bg-gray-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Tag className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">No categories found</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">Create a new category to get started</p>
                <button
                  onClick={() => handleOpenModal()}
                  className="inline-flex items-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Create Category</span>
                </button>
              </div>
            ) : (
              filteredCategories.map((category) => {
                const IconComponent = getIconComponent(category.icon);
                const colorConfig = getColorConfig(category.color);
                const progress = calculateProgress(category.spent, category.budget);
                const progressColor = getProgressColor(category.spent, category.budget);
                const isOverBudget = category.type === 'expense' && category.spent > category.budget;

                return (
                  <div
                    key={category.id}
                    className={`bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-2 ${
                      isOverBudget ? 'border-red-300' : 'border-gray-100'
                    } hover:shadow-xl transition`}
                  >
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                        <div className={`${colorConfig.bg} p-2 sm:p-3 rounded-lg flex-shrink-0`}>
                          <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${colorConfig.text}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{category.name}</h3>
                          <span className={`text-xs font-medium px-2 py-0.5 sm:py-1 rounded-full inline-block mt-1 ${
                            category.type === 'income' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {category.type === 'income' ? 'Income' : 'Expense'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                        <button
                          onClick={() => handleOpenModal(category)}
                          className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>

                    {category.description && (
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{category.description}</p>
                    )}

                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600">
                          {category.type === 'income' ? 'Received' : 'Spent'}
                        </span>
                        <span className="text-base sm:text-lg font-bold text-gray-800">
                          ${category.spent.toFixed(2)}
                        </span>
                      </div>

                      {category.type === 'expense' && category.budget > 0 && (
                        <>
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <span className="text-gray-600">Budget</span>
                            <span className={isOverBudget ? 'text-red-600 font-semibold' : 'text-gray-700'}>
                              ${category.budget.toFixed(2)}
                            </span>
                          </div>

                          <div className="relative">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`${progressColor} h-2 rounded-full transition-all duration-300`}
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">
                              {progress.toFixed(0)}% used
                            </span>
                            <span className={isOverBudget ? 'text-red-600 font-semibold' : 'text-gray-500'}>
                              ${Math.abs(category.budget - category.spent).toFixed(2)} {isOverBudget ? 'over' : 'left'}
                            </span>
                          </div>
                        </>
                      )}

                      <div className="pt-2 sm:pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-gray-600">Transactions</span>
                          <span className="font-semibold text-gray-800">{category.transactionCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>

      {/* Add/Edit Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter category name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add a description for this category"
                  rows="2"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'expense' })}
                    className={`p-4 border-2 rounded-lg transition ${
                      formData.type === 'expense'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <TrendingDown className={`w-6 h-6 mx-auto mb-2 ${
                      formData.type === 'expense' ? 'text-red-600' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      formData.type === 'expense' ? 'text-gray-800' : 'text-gray-600'
                    }`}>
                      Expense
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'income' })}
                    className={`p-4 border-2 rounded-lg transition ${
                      formData.type === 'income'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <TrendingUp className={`w-6 h-6 mx-auto mb-2 ${
                      formData.type === 'income' ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      formData.type === 'income' ? 'text-gray-800' : 'text-gray-600'
                    }`}>
                      Income
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Icon</label>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                  {categoryIcons.map((iconOption) => {
                    const IconComp = iconOption.icon;
                    return (
                      <button
                        key={iconOption.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: iconOption.value })}
                        className={`p-2 sm:p-3 border-2 rounded-lg transition hover:border-gray-400 ${
                          formData.icon === iconOption.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200'
                        }`}
                        title={iconOption.label}
                      >
                        <IconComp className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto ${
                          formData.icon === iconOption.value ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Color</label>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {colorOptions.map((colorOption) => (
                    <button
                      key={colorOption.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: colorOption.value })}
                      className={`p-3 sm:p-4 border-2 rounded-lg transition ${
                        formData.color === colorOption.value
                          ? `${colorOption.border} bg-${colorOption.value}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-${colorOption.value}-500 mx-auto`}></div>
                    </button>
                  ))}
                </div>
              </div>

              {formData.type === 'expense' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Budget (Optional)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
                >
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}