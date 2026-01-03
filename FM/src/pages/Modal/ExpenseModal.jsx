import React, { useState } from 'react';
import { X, DollarSign, Users, Calendar, Tag, FileText, Upload, Check, Percent } from 'lucide-react';

export default function AddExpenseSplitModal({ isOpen, onClose, onSubmit, group, editingExpense = null }) {
  const [formData, setFormData] = useState({
    title: editingExpense?.title || '',
    amount: editingExpense?.amount || '',
    category: editingExpense?.category || 'food',
    date: editingExpense?.date || new Date().toISOString().split('T')[0],
    description: editingExpense?.description || '',
    paidBy: editingExpense?.paidBy || '',
    splitType: editingExpense?.splitType || 'equal',
    splits: editingExpense?.splits || {},
    receipt: null
  });

  const categories = [
    'Food & Dining',
    'Groceries',
    'Transportation',
    'Utilities',
    'Entertainment',
    'Rent',
    'Shopping',
    'Healthcare',
    'Travel',
    'Other'
  ];

  const splitTypes = [
    { value: 'equal', label: 'Split Equally', icon: Users },
    { value: 'percentage', label: 'By Percentage', icon: Percent },
    { value: 'custom', label: 'Custom Amounts', icon: DollarSign }
  ];

  // Initialize splits when group or splitType changes
  React.useEffect(() => {
    if (group && group.members && Object.keys(formData.splits).length === 0) {
      initializeSplits();
    }
  }, [group, formData.splitType]);

  const initializeSplits = () => {
    if (!group || !group.members) return;

    const newSplits = {};
    group.members.forEach(member => {
      if (formData.splitType === 'equal') {
        newSplits[member.id] = {
          amount: 0,
          percentage: 100 / group.members.length,
          selected: true
        };
      } else if (formData.splitType === 'percentage') {
        newSplits[member.id] = {
          amount: 0,
          percentage: 0,
          selected: true
        };
      } else {
        newSplits[member.id] = {
          amount: 0,
          percentage: 0,
          selected: true
        };
      }
    });

    setFormData({ ...formData, splits: newSplits });
  };

  const calculateSplits = () => {
    if (!formData.amount || !group) return;

    const amount = parseFloat(formData.amount);
    const selectedMembers = Object.keys(formData.splits).filter(
      id => formData.splits[id].selected
    );

    if (selectedMembers.length === 0) return;

    const newSplits = { ...formData.splits };

    if (formData.splitType === 'equal') {
      const splitAmount = amount / selectedMembers.length;
      selectedMembers.forEach(id => {
        newSplits[id] = {
          ...newSplits[id],
          amount: splitAmount,
          percentage: (splitAmount / amount) * 100
        };
      });
    } else if (formData.splitType === 'percentage') {
      selectedMembers.forEach(id => {
        const percentage = newSplits[id].percentage || 0;
        newSplits[id] = {
          ...newSplits[id],
          amount: (amount * percentage) / 100
        };
      });
    }

    setFormData({ ...formData, splits: newSplits });
  };

  React.useEffect(() => {
    calculateSplits();
  }, [formData.amount, formData.splitType]);

  const handleSplitChange = (memberId, field, value) => {
    const newSplits = { ...formData.splits };
    newSplits[memberId] = {
      ...newSplits[memberId],
      [field]: field === 'selected' ? value : parseFloat(value) || 0
    };

    setFormData({ ...formData, splits: newSplits });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, receipt: file });
    }
  };

  const getTotalSplit = () => {
    return Object.values(formData.splits)
      .filter(split => split.selected)
      .reduce((sum, split) => sum + (split.amount || 0), 0);
  };

  const getTotalPercentage = () => {
    return Object.values(formData.splits)
      .filter(split => split.selected)
      .reduce((sum, split) => sum + (split.percentage || 0), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount || !formData.paidBy) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedMembers = Object.keys(formData.splits).filter(
      id => formData.splits[id].selected
    );

    if (selectedMembers.length === 0) {
      alert('Please select at least one member to split with');
      return;
    }

    if (formData.splitType === 'percentage' && Math.abs(getTotalPercentage() - 100) > 0.01) {
      alert('Percentages must add up to 100%');
      return;
    }

    if (formData.splitType === 'custom' && Math.abs(getTotalSplit() - parseFloat(formData.amount)) > 0.01) {
      alert('Split amounts must equal the total expense');
      return;
    }

    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
      groupId: group.id,
      id: editingExpense?.id || Date.now(),
      createdAt: editingExpense?.createdAt || new Date().toISOString()
    };

    onSubmit(expenseData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      amount: '',
      category: 'food',
      date: new Date().toISOString().split('T')[0],
      description: '',
      paidBy: '',
      splitType: 'equal',
      splits: {},
      receipt: null
    });
    onClose();
  };

  if (!isOpen || !group) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {editingExpense ? 'Edit Expense' : 'Add Expense'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{group.name}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Expense Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expense Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Dinner at Restaurant"
              required
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount *</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base appearance-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* Paid By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Paid By *</label>
            <select
              value={formData.paidBy}
              onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
              required
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
            >
              <option value="">Select who paid</option>
              {group.members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 sm:top-3.5 w-5 h-5 text-gray-400" />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add notes about this expense..."
                rows="2"
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Split Type */}
          <div className="border-t border-gray-200 pt-4 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 mb-3">Split Method *</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {splitTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, splitType: type.value })}
                    className={`p-3 sm:p-4 border-2 rounded-lg transition ${
                      formData.splitType === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 ${
                      formData.splitType === type.value ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <span className={`text-xs sm:text-sm font-medium block ${
                      formData.splitType === type.value ? 'text-gray-800' : 'text-gray-600'
                    }`}>
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Split Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Split Between</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {group.members.map((member) => (
                <div
                  key={member.id}
                  className={`flex items-center justify-between p-3 border-2 rounded-lg transition ${
                    formData.splits[member.id]?.selected
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={formData.splits[member.id]?.selected || false}
                      onChange={(e) => handleSplitChange(member.id, 'selected', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{member.name}</p>
                      <p className="text-xs text-gray-500 truncate">{member.email}</p>
                    </div>
                  </div>

                  {formData.splits[member.id]?.selected && (
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                      {formData.splitType === 'percentage' && (
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={formData.splits[member.id]?.percentage || 0}
                            onChange={(e) => handleSplitChange(member.id, 'percentage', e.target.value)}
                            min="0"
                            max="100"
                            step="0.01"
                            className="w-16 sm:w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right"
                          />
                          <span className="ml-1 text-sm text-gray-600">%</span>
                        </div>
                      )}
                      {formData.splitType === 'custom' && (
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-1">$</span>
                          <input
                            type="number"
                            value={formData.splits[member.id]?.amount || 0}
                            onChange={(e) => handleSplitChange(member.id, 'amount', e.target.value)}
                            min="0"
                            step="0.01"
                            className="w-20 sm:w-24 px-2 py-1 border border-gray-300 rounded text-sm text-right"
                          />
                        </div>
                      )}
                      {formData.splitType === 'equal' && (
                        <span className="text-sm font-medium text-blue-600">
                          ${(formData.splits[member.id]?.amount || 0).toFixed(2)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Split Summary */}
            {formData.amount && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Total Expense:</span>
                  <span className="font-semibold text-gray-800">${parseFloat(formData.amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Total Split:</span>
                  <span className={`font-semibold ${
                    Math.abs(getTotalSplit() - parseFloat(formData.amount)) < 0.01
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    ${getTotalSplit().toFixed(2)}
                  </span>
                </div>
                {formData.splitType === 'percentage' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Percentage:</span>
                    <span className={`font-semibold ${
                      Math.abs(getTotalPercentage() - 100) < 0.01
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {getTotalPercentage().toFixed(2)}%
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Receipt Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attach Receipt (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition">
              <label className="flex flex-col items-center cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 text-center mb-1">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*,.pdf"
                  className="hidden"
                />
              </label>
              {formData.receipt && (
                <div className="mt-3 text-center">
                  <p className="text-sm text-green-600 font-medium">
                    ✓ {formData.receipt.name}
                  </p>
                </div>
              )}
            </div>
          </div>

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
              {editingExpense ? 'Update Expense' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}