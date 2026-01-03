import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, FileText, Users, CreditCard, Tag, Link as LinkIcon, Bell } from 'lucide-react';

export default function AddEventModal({ isOpen, onClose, onSubmit, editingEvent = null, prefilledDate = null }) {
  const [formData, setFormData] = useState({
    title: editingEvent?.title || '',
    description: editingEvent?.description || '',
    startDate: editingEvent?.startDate || prefilledDate || '',
    endDate: editingEvent?.endDate || prefilledDate || '',
    startTime: editingEvent?.startTime || '',
    endTime: editingEvent?.endTime || '',
    allDay: editingEvent?.allDay || false,
    category: editingEvent?.category || 'personal',
    location: editingEvent?.location || '',
    linkedTransaction: editingEvent?.linkedTransaction || '',
    attendees: editingEvent?.attendees || '',
    reminder: editingEvent?.reminder || '1_day',
    color: editingEvent?.color || 'blue',
    url: editingEvent?.url || ''
  });

  const eventCategories = [
    { value: 'personal', label: 'Personal', color: 'blue', icon: '👤' },
    { value: 'work', label: 'Work', color: 'purple', icon: '💼' },
    { value: 'financial', label: 'Financial', color: 'green', icon: '💰' },
    { value: 'social', label: 'Social', color: 'pink', icon: '🎉' },
    { value: 'health', label: 'Health', color: 'red', icon: '❤️' },
    { value: 'other', label: 'Other', color: 'orange', icon: '📌' }
  ];

  const colorOptions = [
    { value: 'blue', label: 'Blue', hex: '#3B82F6' },
    { value: 'purple', label: 'Purple', hex: '#A855F7' },
    { value: 'green', label: 'Green', hex: '#10B981' },
    { value: 'red', label: 'Red', hex: '#EF4444' },
    { value: 'orange', label: 'Orange', hex: '#F97316' },
    { value: 'pink', label: 'Pink', hex: '#EC4899' },
    { value: 'yellow', label: 'Yellow', hex: '#EAB308' },
    { value: 'indigo', label: 'Indigo', hex: '#6366F1' }
  ];

  const reminderOptions = [
    { value: 'none', label: 'No reminder' },
    { value: '0', label: 'At time of event' },
    { value: '15_min', label: '15 minutes before' },
    { value: '30_min', label: '30 minutes before' },
    { value: '1_hour', label: '1 hour before' },
    { value: '2_hours', label: '2 hours before' },
    { value: '1_day', label: '1 day before' },
    { value: '2_days', label: '2 days before' },
    { value: '1_week', label: '1 week before' }
  ];

  const handleAllDayChange = (checked) => {
    setFormData({
      ...formData,
      allDay: checked,
      startTime: checked ? '' : formData.startTime,
      endTime: checked ? '' : formData.endTime
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.startDate) {
      alert('Please fill in all required fields');
      return;
    }

    if (!formData.allDay && (!formData.startTime || !formData.endTime)) {
      alert('Please provide start and end times');
      return;
    }

    // Validate end date is not before start date
    if (formData.endDate && formData.endDate < formData.startDate) {
      alert('End date cannot be before start date');
      return;
    }

    // Validate end time is not before start time on same day
    if (!formData.allDay && formData.startDate === formData.endDate) {
      if (formData.endTime <= formData.startTime) {
        alert('End time must be after start time');
        return;
      }
    }

    const eventData = {
      ...formData,
      id: editingEvent?.id || Date.now(),
      createdAt: editingEvent?.createdAt || new Date().toISOString()
    };

    onSubmit(eventData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      allDay: false,
      category: 'personal',
      location: '',
      linkedTransaction: '',
      attendees: '',
      reminder: '1_day',
      color: 'blue',
      url: ''
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
            {editingEvent ? 'Edit Event' : 'Create New Event'}
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
          {/* Event Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Team Meeting, Birthday Party"
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
                placeholder="Add event description..."
                rows="3"
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  min={formData.startDate}
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* All Day Toggle */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="allDay"
              checked={formData.allDay}
              onChange={(e) => handleAllDayChange(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="allDay" className="text-sm font-medium text-gray-700 cursor-pointer">
              All day event
            </label>
          </div>

          {/* Time Range */}
          {!formData.allDay && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required={!formData.allDay}
                    className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required={!formData.allDay}
                    className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {eventCategories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: category.value, color: category.color })}
                  className={`p-3 sm:p-4 border-2 rounded-lg transition ${
                    formData.category === category.value
                      ? `border-${category.color}-500 bg-${category.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <span className={`text-sm font-medium block ${
                    formData.category === category.value ? 'text-gray-800' : 'text-gray-600'
                  }`}>
                    {category.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Event Color</label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  className={`relative p-3 sm:p-4 border-2 rounded-lg transition ${
                    formData.color === color.value
                      ? 'border-gray-800 scale-110'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  title={color.label}
                >
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-${color.value}-500 mx-auto`}></div>
                  {formData.color === color.value && (
                    <div className="absolute -top-1 -right-1 bg-gray-800 rounded-full p-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Add location"
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Attendees */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attendees (Optional)</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.attendees}
                onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                placeholder="e.g., john@email.com, jane@email.com (comma separated)"
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Link to Transaction */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Link to Transaction (Optional)</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.linkedTransaction}
                onChange={(e) => setFormData({ ...formData, linkedTransaction: e.target.value })}
                placeholder="e.g., Rent Payment - $1200"
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Link this event to a financial transaction for better tracking
            </p>
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL / Meeting Link</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://zoom.us/meeting-link"
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Reminder */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reminder</label>
            <div className="relative">
              <Bell className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.reminder}
                onChange={(e) => setFormData({ ...formData, reminder: e.target.value })}
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base appearance-none"
              >
                {reminderOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
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
              {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}