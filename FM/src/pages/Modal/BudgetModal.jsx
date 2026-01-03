import React, { useState } from 'react';
import { X, DollarSign, Tag, Calendar, TrendingUp, AlertCircle, Plus, Trash2, Target, Bell } from 'lucide-react';

export default function BudgetSetupModal({ isOpen, onClose, onSubmit, editingBudget = null }) {
  const [formData, setFormData] = useState({
    name: editingBudget?.name || '',
    totalAmount: editingBudget?.totalAmount || '',
    period: editingBudget?.period || 'monthly',
    startDate: editingBudget?.startDate || new Date().toISOString().split('T')[0],
    categoryBudgets: editingBudget?.categoryBudgets || [],
    alertThreshold: editingBudget?.alertThreshold || 80,
    enableAlerts: editingBudget?.enableAlerts !== false,
    rollover: editingBudget?.rollover || false
  });

  const [newCategoryBudget, setNewCategoryBudget] = useState({
    category: '',
    amount: '',
    color: 'blue'
  });

  const predefinedCategories = [
    { name: 'Groceries', color: 'green' },
    { name: 'Dining Out', color: 'orange' },
    { name: 'Transportation', color: 'blue' },
    { name: 'Utilities', color: 'yellow' },
    { name: 'Entertainment', color: 'purple' },
    { name: 'Healthcare', color: 'red' },
    { name: 'Shopping', color: 'pink' },
    { name: 'Education', color: 'indigo' },
    { name: 'Bills', color: 'red' },
    { name: 'Savings', color: 'green' },
    { name: 'Other', color: 'gray' }
  ];

  const budgetPeriods = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const colorOptions = [
    'blue', 'purple', 'green', 'red', 'orange', 'pink', 'yellow', 'indigo', 'gray'
  ];

  const handleAddCategoryBudget = () => {
    if (!newCategoryBudget.category || !newCategoryBudget.amount) {
      alert('Please select a category and enter an amount');
      return;
    }

    const amount = parseFloat(newCategoryBudget.amount);
    if (amount <= 0) {
      alert('Please enter a valid amount greater than 0');
      return;
    }

    // Check if category already exists
    if (formData.categoryBudgets.some(cb => cb.category === newCategoryBudget.category)) {
      alert('This category already has a budget. Please edit or remove it first.');
      return;
    }

    const categoryInfo = predefinedCategories.find(c => c.name === newCategoryBudget.category);

    setFormData({
      ...formData,
      categoryBudgets: [
        ...formData.categoryBudgets,
        {
          id: Date.now(),
          category: newCategoryBudget.category,
          amount: amount,
          color: categoryInfo?.color || newCategoryBudget.color
        }
      ]
    });

    setNewCategoryBudget({ category: '', amount: '', color: 'blue' });
  };

  const handleRemoveCategoryBudget = (id) => {
    setFormData({
      ...formData,
      categoryBudgets: formData.categoryBudgets.filter(cb => cb.id !== id)
    });
  };

  const getTotalCategoryBudgets = () => {
    return formData.categoryBudgets.reduce((sum, cb) => sum + cb.amount, 0);
  };

  const getRemainingBudget = () => {
    const total = parseFloat(formData.totalAmount) || 0;
    const allocated = getTotalCategoryBudgets();
    return total - allocated;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.totalAmount) {
      alert('Please fill in all required fields');
      return;
    }

    const totalAmount = parseFloat(formData.totalAmount);
    if (totalAmount <= 0) {
      alert('Please enter a valid total budget amount');
      return;
    }

    const totalCategoryBudgets = getTotalCategoryBudgets();
    if (totalCategoryBudgets > totalAmount) {
      alert('Category budgets exceed the total budget amount');
      return;
    }

    const budgetData = {
      ...formData,
      totalAmount: totalAmount,
      id: editingBudget?.id || Date.now(),
      createdAt: editingBudget?.createdAt || new Date().toISOString()
    };

    onSubmit(budgetData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      totalAmount: '',
      period: 'monthly',
      startDate: new Date().toISOString().split('T')[0],
      categoryBudgets: [],
      alertThreshold: 80,
      enableAlerts: true,
      rollover: false
    });
    setNewCategoryBudget({ category: '', amount: '', color: 'blue' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {editingBudget ? 'Edit Budget' : 'Create Budget Plan'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Budget Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., January 2026 Budget, Q1 Budget"
              required
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
            />
          </div>

          {/* Total Budget & Period */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Budget *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.totalAmount}
                  onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Period *</label>
              <select
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                required
                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              >
                {budgetPeriods.map(period => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Category Budgets Section */}
          <div className="border-t border-gray-200 pt-4 sm:pt-5">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Category Budgets</h3>
            
            {/* Add Category Budget Form */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={newCategoryBudget.category}
                      onChange={(e) => setNewCategoryBudget({ ...newCategoryBudget, category: e.target.value })}
                      className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm appearance-none"
                    >
                      <option value="">Select category</option>
                      {predefinedCategories
                        .filter(cat => !formData.categoryBudgets.some(cb => cb.category === cat.name))
                        .map(cat => (
                          <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={newCategoryBudget.amount}
                      onChange={(e) => setNewCategoryBudget({ ...newCategoryBudget, amount: e.target.value })}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-end">
                  <button
                    type="button"
                    onClick={handleAddCategoryBudget}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                  >
                    <Plus className="w-4 h-4 sm:mr-1" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Category Budgets List */}
            {formData.categoryBudgets.length > 0 ? (
              <div className="space-y-2 mb-4">
                {formData.categoryBudgets.map((categoryBudget) => (
                  <div
                    key={categoryBudget.id}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className={`w-3 h-3 rounded-full bg-${categoryBudget.color}-500 flex-shrink-0`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm">{categoryBudget.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 flex-shrink-0">
                      <span className="font-semibold text-gray-800 text-sm">
                        ${categoryBudget.amount.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCategoryBudget(categoryBudget.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 mb-4">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No category budgets added yet</p>
                <p className="text-xs text-gray-500 mt-1">Add categories to track spending better</p>
              </div>
            )}

            {/* Budget Summary */}
            {formData.totalAmount && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Total Budget:</span>
                    <span className="font-semibold text-gray-900">
                      ${parseFloat(formData.totalAmount).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Allocated to Categories:</span>
                    <span className="font-semibold text-gray-900">
                      ${getTotalCategoryBudgets().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-blue-300">
                    <span className="text-gray-700 font-medium">Remaining:</span>
                    <span className={`font-bold ${
                      getRemainingBudget() >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${getRemainingBudget().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Alert Settings */}
          <div className="border-t border-gray-200 pt-4 sm:pt-5">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Alert Settings</h3>
            
            <div className="space-y-4">
              {/* Enable Alerts */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Enable Budget Alerts</p>
                    <p className="text-xs text-gray-600">Get notified when approaching limits</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enableAlerts}
                    onChange={(e) => setFormData({ ...formData, enableAlerts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Alert Threshold */}
              {formData.enableAlerts && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alert Threshold ({formData.alertThreshold}%)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      value={formData.alertThreshold}
                      onChange={(e) => setFormData({ ...formData, alertThreshold: parseInt(e.target.value) })}
                      min="50"
                      max="100"
                      step="5"
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-gray-700 w-12 text-right">
                      {formData.alertThreshold}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    You'll be notified when you reach {formData.alertThreshold}% of your budget
                  </p>
                </div>
              )}

              {/* Rollover Setting */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Rollover Unused Budget</p>
                    <p className="text-xs text-gray-600">Carry over remaining balance to next period</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rollover}
                    onChange={(e) => setFormData({ ...formData, rollover: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          {getRemainingBudget() < 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">Category budgets exceed total budget</p>
                <p className="text-xs text-red-700 mt-1">
                  Please adjust your category budgets or increase the total budget amount.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="w-full px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg text-sm sm:text-base"
            >
              {editingBudget ? 'Update Budget' : 'Create Budget'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}