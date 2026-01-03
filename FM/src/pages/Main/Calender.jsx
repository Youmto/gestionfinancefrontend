import React, { useState } from 'react';
import { TrendingUp, Plus, Calendar, ChevronLeft, ChevronRight, X, Clock, Edit2, Trash2, Menu, Home, CreditCard, Users, Bell, Settings, LogOut, PieChart, MapPin, AlignLeft, Tag } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDayModal, setShowDayModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    allDay: false,
    category: 'personal',
    location: '',
    linkedTransaction: ''
  });

  const eventCategories = [
    { value: 'all', label: 'All Events', color: 'gray' },
    { value: 'personal', label: 'Personal', color: 'blue' },
    { value: 'work', label: 'Work', color: 'purple' },
    { value: 'financial', label: 'Financial', color: 'green' },
    { value: 'social', label: 'Social', color: 'pink' },
    { value: 'health', label: 'Health', color: 'red' },
    { value: 'other', label: 'Other', color: 'orange' }
  ];

  // Sample events data
  const allEvents = [
    {
      id: 1,
      title: 'Team Meeting',
      description: 'Weekly team sync',
      startDate: '2026-01-02',
      startTime: '10:00',
      endTime: '11:00',
      category: 'work',
      location: 'Conference Room A',
      allDay: false
    },
    {
      id: 2,
      title: 'Lunch with Client',
      description: 'Discuss Q1 targets',
      startDate: '2026-01-02',
      startTime: '13:00',
      endTime: '14:30',
      category: 'work',
      location: 'Downtown Restaurant',
      allDay: false
    },
    {
      id: 3,
      title: 'Rent Payment Due',
      description: 'Monthly rent payment',
      startDate: '2026-01-05',
      startTime: '09:00',
      endTime: '09:00',
      category: 'financial',
      allDay: false,
      linkedTransaction: 'Rent - $1200'
    },
    {
      id: 4,
      title: 'Gym Session',
      description: 'Leg day workout',
      startDate: '2026-01-06',
      startTime: '07:00',
      endTime: '08:30',
      category: 'health',
      location: 'Fitness Center',
      allDay: false
    },
    {
      id: 5,
      title: 'Birthday Party',
      description: "Sarah's birthday celebration",
      startDate: '2026-01-10',
      startTime: '19:00',
      endTime: '23:00',
      category: 'social',
      location: 'The Garden Venue',
      allDay: false
    },
    {
      id: 6,
      title: 'Credit Card Payment',
      description: 'Monthly CC payment',
      startDate: '2026-01-10',
      startTime: '10:00',
      endTime: '10:00',
      category: 'financial',
      allDay: false,
      linkedTransaction: 'CC Payment - $450'
    },
    {
      id: 7,
      title: 'Doctor Appointment',
      description: 'Annual checkup',
      startDate: '2026-01-12',
      startTime: '14:00',
      endTime: '15:00',
      category: 'health',
      location: 'Medical Center',
      allDay: false
    },
    {
      id: 8,
      title: 'Project Deadline',
      description: 'Submit final report',
      startDate: '2026-01-15',
      allDay: true,
      category: 'work'
    },
    {
      id: 9,
      title: 'Family Dinner',
      description: 'Monthly family gathering',
      startDate: '2026-01-18',
      startTime: '18:00',
      endTime: '21:00',
      category: 'personal',
      location: 'Home',
      allDay: false
    },
    {
      id: 10,
      title: 'Weekend Trip',
      description: 'Beach vacation',
      startDate: '2026-01-25',
      endDate: '2026-01-26',
      allDay: true,
      category: 'personal',
      location: 'Beach Resort'
    }
  ];

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty days for padding
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    
    const dateStr = date.toISOString().split('T')[0];
    
    return allEvents.filter(event => {
      if (selectedCategory !== 'all' && event.category !== selectedCategory) {
        return false;
      }

      // Check if event is on this date
      if (event.startDate === dateStr) return true;
      
      // Check if it's a multi-day event
      if (event.endDate) {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);
        const current = new Date(dateStr);
        return current >= start && current <= end;
      }
      
      return false;
    });
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(date);
    setShowDayModal(true);
  };

  const handleOpenEventModal = (event = null, date = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description || '',
        startDate: event.startDate,
        endDate: event.endDate || event.startDate,
        startTime: event.startTime || '',
        endTime: event.endTime || '',
        allDay: event.allDay,
        category: event.category,
        location: event.location || '',
        linkedTransaction: event.linkedTransaction || ''
      });
    } else {
      setEditingEvent(null);
      const dateStr = date ? date.toISOString().split('T')[0] : '';
      setFormData({
        title: '',
        description: '',
        startDate: dateStr,
        endDate: dateStr,
        startTime: '',
        endTime: '',
        allDay: false,
        category: 'personal',
        location: '',
        linkedTransaction: ''
      });
    }
    setShowEventModal(true);
    setShowDayModal(false);
  };

  const handleSubmitEvent = () => {
    console.log(editingEvent ? 'Update event:' : 'Create event:', formData);
    setShowEventModal(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      console.log('Delete event:', id);
      setShowDayModal(false);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getCategoryColor = (category) => {
    const cat = eventCategories.find(c => c.value === category);
    return cat ? cat.color : 'gray';
  };

  

  const days = getDaysInMonth(currentDate);
  const totalEvents = allEvents.filter(e => selectedCategory === 'all' || e.category === selectedCategory).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} Item="Calendar" />

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
                <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
                <p className="text-sm text-gray-500">Organize your events and schedule</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Mini Calendar and Categories */}
            <div className="lg:col-span-1 space-y-6">
              {/* Mini Info Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Events</p>
                <h3 className="text-3xl font-bold text-gray-800">{totalEvents}</h3>
              </div>

              {/* Category Filter */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {eventCategories.map((category) => {
                    const count = category.value === 'all' 
                      ? allEvents.length 
                      : allEvents.filter(e => e.category === category.value).length;
                    
                    return (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                          selectedCategory === category.value
                            ? 'bg-blue-50 border-2 border-blue-500'
                            : 'border-2 border-transparent hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                          <span className="font-medium text-gray-800">{category.label}</span>
                        </div>
                        <span className="text-sm text-gray-500">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Add Button */}
              <button
                onClick={() => handleOpenEventModal()}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>New Event</span>
              </button>
            </div>

            {/* Main Calendar */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Calendar Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">{getMonthName(currentDate)}</h2>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleToday}
                      className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    >
                      Today
                    </button>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handlePreviousMonth}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={handleNextMonth}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="p-6">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-2">
                    {days.map((day, index) => {
                      const events = getEventsForDate(day);
                      const isCurrentDay = isToday(day);
                      const isSelected = isSameDay(day, selectedDate);

                      return (
                        <div
                          key={index}
                          onClick={() => handleDateClick(day)}
                          className={`min-h-[100px] p-2 border-2 rounded-lg transition cursor-pointer ${
                            !day
                              ? 'bg-gray-50 border-transparent cursor-default'
                              : isSelected
                              ? 'border-blue-500 bg-blue-50'
                              : isCurrentDay
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {day && (
                            <>
                              <div className={`text-sm font-semibold mb-1 ${
                                isCurrentDay ? 'text-purple-600' : 'text-gray-800'
                              }`}>
                                {day.getDate()}
                              </div>
                              <div className="space-y-1">
                                {events.slice(0, 2).map((event) => {
                                  const color = getCategoryColor(event.category);
                                  return (
                                    <div
                                      key={event.id}
                                      className={`text-xs px-2 py-1 bg-${color}-100 text-${color}-700 rounded truncate`}
                                    >
                                      {event.allDay ? '📅' : '🕐'} {event.title}
                                    </div>
                                  );
                                })}
                                {events.length > 2 && (
                                  <div className="text-xs text-gray-500 px-2">
                                    +{events.length - 2} more
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-sm font-medium text-gray-600">Legend:</span>
                    {eventCategories.filter(c => c.value !== 'all').map((category) => (
                      <div key={category.value} className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                        <span className="text-sm text-gray-600">{category.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Day Events Modal */}
      {showDayModal && selectedDate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h2>
              <button onClick={() => setShowDayModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Events ({getEventsForDate(selectedDate).length})
                </h3>
                <button
                  onClick={() => handleOpenEventModal(null, selectedDate)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition text-sm font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Event</span>
                </button>
              </div>

              {getEventsForDate(selectedDate).length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-600">No events scheduled for this day</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getEventsForDate(selectedDate).map((event) => {
                    const color = getCategoryColor(event.category);
                    return (
                      <div
                        key={event.id}
                        className={`border-l-4 border-${color}-500 rounded-lg p-4 hover:shadow-md transition bg-${color}-50`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h4>
                            
                            {event.description && (
                              <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                            )}

                            <div className="space-y-2">
                              {!event.allDay && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="w-4 h-4 mr-2" />
                                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                </div>
                              )}
                              
                              {event.location && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <MapPin className="w-4 h-4 mr-2" />
                                  {event.location}
                                </div>
                              )}

                              {event.linkedTransaction && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <CreditCard className="w-4 h-4 mr-2" />
                                  {event.linkedTransaction}
                                </div>
                              )}

                              <div className="flex items-center space-x-2 mt-3">
                                <span className={`px-3 py-1 text-xs font-semibold bg-${color}-100 text-${color}-700 rounded-full`}>
                                  {eventCategories.find(c => c.value === event.category)?.label}
                                </span>
                                {event.allDay && (
                                  <span className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">
                                    All Day
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handleOpenEventModal(event)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h2>
              <button onClick={() => setShowEventModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter event title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add event description"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="allDay"
                  checked={formData.allDay}
                  onChange={(e) => setFormData({ ...formData, allDay: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="allDay" className="text-sm font-medium text-gray-700">
                  All day event
                </label>
              </div>

              {!formData.allDay && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="grid grid-cols-3 gap-3">
                  {eventCategories.filter(c => c.value !== 'all').map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: category.value })}
                      className={`p-3 border-2 rounded-lg transition ${
                        formData.category === category.value
                          ? `border-${category.color}-500 bg-${category.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-${category.color}-500 mx-auto mb-2`}></div>
                      <span className={`text-xs font-medium ${
                        formData.category === category.value ? 'text-gray-800' : 'text-gray-600'
                      }`}>
                        {category.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Add location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link to Transaction (Optional)</label>
                <input
                  type="text"
                  value={formData.linkedTransaction}
                  onChange={(e) => setFormData({ ...formData, linkedTransaction: e.target.value })}
                  placeholder="e.g., Rent Payment - $1200"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitEvent}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
                >
                  {editingEvent ? 'Update Event' : 'Create Event'}
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