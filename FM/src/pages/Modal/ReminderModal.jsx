import React, { useState } from 'react';
import { X, Bell, Calendar, Clock, Tag, FileText, Repeat, Users, CreditCard, AlertCircle } from 'lucide-react';

export default function AddReminderModal({ isOpen, onClose, onSubmit, editingReminder = null }) {
  const [formData, setFormData] = useState({
    title: editingReminder?.title || '',
    description: editingReminder?.description || '',
    date: editingReminder?.date || '',
    time: editingReminder?.time || '',
    type: editingReminder?.type || 'general',
    group: editingReminder?.group || '',
    recurring: editingReminder?.recurring || false,
    recurringType: editingReminder?.recurringType || 'none',
    priority: editingReminder?.priority || 'medium',
    notifyBefore: editingReminder?.notifyBefore || '1_day'
  });

  const reminderTypes = [
    { value: 'payment', label: 'Payment', icon: CreditCard, color: 'blue', description: 'Bill or payment reminder' },
    { value: 'bill', label: 'Bill', icon: AlertCircle, color: 'red', description: 'Utility or subscription bill' },
    { value: 'general', label: 'General', icon: Bell, color: 'purple', description: 'General reminder' }
  ];

  const recurringTypes = [
    { value: 'none', label: 'Does not repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Every 2 weeks' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Every 3 months' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low', color: 'gray' },
    { value: 'medium', label: 'Medium', color: 'blue' },
    { value: 'high', label: 'High', color: 'orange' },
    { value: 'urgent', label: 'Urgent', color: 'red' }
  ];

  const notifyBeforeOptions = [
    { value: 'none', label: 'At time of event' },
    { value: '15_min', label: '15 minutes before' },
    { value: '30_min', label: '30 minutes before' },
    { value: '1_hour', label: '1 hour before' },
    { value: '2_hours', label: '2 hours before' },
    { value: '1_day', label: '1 day before' },
    { value: '2_days', label: '2 days before' },
    { value: '1_week', label: '1 week before' }
  ];

  // Sample groups (you would fetch these from your app state)
  const groups = [
    { id: 1, name: 'Family Budget' },
    { id: 2, name: 'Roommates Apartment' },
    { id: 3, name: 'Summer Vacation 2026' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate date is not in the past
    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    const now = new Date();
    if (selectedDateTime < now && !editingReminder) {
      const confirmPast = confirm('The selected date and time is in the past. Do you want to continue?');
      if (!confirmPast) return;
    }

    const reminderData = {
      ...formData,
      id: editingReminder?.id || Date.now(),
      createdAt: editingReminder?.createdAt || new Date().toISOString(),
      completed: editingReminder?.completed || false
    };

    onSubmit(reminderData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      type: 'general',
      group: '',
      recurring: false,
      recurringType: 'none',
      priority: 'medium',
      notifyBefore: '1_day'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {editingReminder ? 'Edit Reminder' : 'Create New Reminder'}
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
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Pay Rent, Submit Report"
              required
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 sm:top-3.5 w-5 h-5 text-gray-400" />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add additional details..."
                rows="3"
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Reminder Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {reminderTypes.map((type) => {
                const TypeIcon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.value })}
                    className={`p-4 border-2 rounded-lg transition text-left ${
                      formData.type === type.value
                        ? `border-${type.color}-500 bg-${type.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <TypeIcon className={`w-6 h-6 mb-2 ${
                      formData.type === type.value ? `text-${type.color}-600` : 'text-gray-400'
                    }`} />
                    <div>
                      <p className={`text-sm font-semibold ${
                        formData.type === type.value ? 'text-gray-800' : 'text-gray-600'
                      }`}>
                        {type.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* Recurrence */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recurrence</label>
            <div className="relative">
              <Repeat className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.recurringType}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  recurringType: e.target.value,
                  recurring: e.target.value !== 'none'
                })}
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base appearance-none"
              >
                {recurringTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Priority Level</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {priorityLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: level.value })}
                  className={`p-3 border-2 rounded-lg transition ${
                    formData.priority === level.value
                      ? `border-${level.color}-500 bg-${level.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full bg-${level.color}-500 mx-auto mb-2`}></div>
                  <span className={`text-sm font-medium ${
                    formData.priority === level.value ? 'text-gray-800' : 'text-gray-600'
                  }`}>
                    {level.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Notify Before */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notify Me</label>
            <div className="relative">
              <Bell className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.notifyBefore}
                onChange={(e) => setFormData({ ...formData, notifyBefore: e.target.value })}
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base appearance-none"
              >
                {notifyBeforeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Group (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Group (Optional)</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base appearance-none"
              >
                <option value="">Personal Reminder</option>
                {groups.map(group => (
                  <option key={group.id} value={group.name}>{group.name}</option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Select a group to share this reminder with group members
            </p>
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
              {editingReminder ? 'Update Reminder' : 'Create Reminder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}