import React, { useState } from 'react';
import { TrendingUp, Plus, Bell, Calendar, Clock, ChevronDown, ChevronUp, Filter, Search, Edit2, Trash2, Check, X, Menu, Home, CreditCard, Users, Settings, LogOut, PieChart, AlertCircle, Repeat } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

export default function Reminder() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCompleted, setShowCompleted] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'general',
    group: '',
    recurring: false,
    recurringType: 'none'
  });

  const reminderTypes = [
    { value: 'payment', label: 'Payment', icon: CreditCard, color: 'blue' },
    { value: 'bill', label: 'Bill', icon: AlertCircle, color: 'red' },
    { value: 'general', label: 'General', icon: Bell, color: 'purple' }
  ];

  const recurringTypes = [
    { value: 'none', label: 'Does not repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  // Sample groups for group reminders
  const groups = [
    { id: 1, name: 'Family Budget' },
    { id: 2, name: 'Roommates Apartment' },
    { id: 3, name: 'Summer Vacation 2026' }
  ];

  // Sample reminders data
  const allReminders = [
    {
      id: 1,
      title: 'Pay Rent',
      description: 'Monthly rent payment due',
      date: '2026-01-05',
      time: '09:00',
      type: 'payment',
      isPersonal: true,
      completed: false,
      recurring: true,
      recurringType: 'monthly'
    },
    {
      id: 2,
      title: 'Submit Monthly Report',
      description: 'Send financial report to accountant',
      date: '2026-01-07',
      time: '14:00',
      type: 'general',
      isPersonal: true,
      completed: false,
      recurring: false
    },
    {
      id: 3,
      title: 'Credit Card Payment Due',
      description: 'Pay credit card bill before due date',
      date: '2026-01-10',
      time: '23:59',
      type: 'bill',
      isPersonal: true,
      completed: false,
      recurring: true,
      recurringType: 'monthly'
    },
    {
      id: 4,
      title: 'Utility Bills',
      description: 'Electricity and water bills',
      date: '2026-01-12',
      time: '10:00',
      type: 'bill',
      isPersonal: false,
      groupName: 'Family Budget',
      completed: false,
      recurring: true,
      recurringType: 'monthly'
    },
    {
      id: 5,
      title: 'Insurance Premium',
      description: 'Health insurance payment',
      date: '2026-01-15',
      time: '12:00',
      type: 'payment',
      isPersonal: true,
      completed: false,
      recurring: false
    },
    {
      id: 6,
      title: 'Team Dinner Expense',
      description: 'Split team dinner costs',
      date: '2026-01-08',
      time: '19:00',
      type: 'general',
      isPersonal: false,
      groupName: 'Roommates Apartment',
      completed: false,
      recurring: false
    },
    // Completed reminders
    {
      id: 7,
      title: 'Grocery Shopping',
      description: 'Buy groceries for the week',
      date: '2026-01-01',
      time: '16:00',
      type: 'general',
      isPersonal: true,
      completed: true,
      completedDate: '2026-01-01',
      recurring: false
    },
    {
      id: 8,
      title: 'Internet Bill',
      description: 'Monthly internet payment',
      date: '2025-12-30',
      time: '10:00',
      type: 'bill',
      isPersonal: false,
      groupName: 'Roommates Apartment',
      completed: true,
      completedDate: '2025-12-30',
      recurring: true,
      recurringType: 'monthly'
    },
    {
      id: 9,
      title: 'Car Service',
      description: 'Schedule car maintenance',
      date: '2025-12-28',
      time: '08:00',
      type: 'general',
      isPersonal: true,
      completed: true,
      completedDate: '2025-12-28',
      recurring: false
    }
  ];

  const upcomingReminders = allReminders.filter(r => !r.completed);
  const completedReminders = allReminders.filter(r => r.completed);

  const filteredUpcoming = upcomingReminders.filter(reminder => {
    const matchesSearch = reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' ||
                         (activeFilter === 'personal' && reminder.isPersonal) ||
                         (activeFilter === 'group' && !reminder.isPersonal);

    return matchesSearch && matchesFilter;
  });

  const sortedUpcoming = [...filteredUpcoming].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getDaysUntil = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };

  const getTypeConfig = (type) => {
    return reminderTypes.find(t => t.value === type) || reminderTypes[2];
  };

  const handleOpenModal = (reminder = null) => {
    if (reminder) {
      setEditingReminder(reminder);
      setFormData({
        title: reminder.title,
        description: reminder.description,
        date: reminder.date,
        time: reminder.time,
        type: reminder.type,
        group: reminder.groupName || '',
        recurring: reminder.recurring,
        recurringType: reminder.recurringType || 'none'
      });
    } else {
      setEditingReminder(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        type: 'general',
        group: '',
        recurring: false,
        recurringType: 'none'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = () => {
    console.log(editingReminder ? 'Update reminder:' : 'Create reminder:', formData);
    setShowModal(false);
    setEditingReminder(null);
  };

  const handleComplete = (id) => {
    console.log('Mark as completed:', id);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this reminder?')) {
      console.log('Delete reminder:', id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} Item={"Reminders"} />

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
                <h1 className="text-2xl font-bold text-gray-800">Reminders</h1>
                <p className="text-sm text-gray-500">Never miss an important payment or event</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">Total Reminders</p>
              <h3 className="text-3xl font-bold text-gray-800">{allReminders.length}</h3>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">Upcoming</p>
              <h3 className="text-3xl font-bold text-gray-800">{upcomingReminders.length}</h3>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">Completed</p>
              <h3 className="text-3xl font-bold text-gray-800">{completedReminders.length}</h3>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search reminders..."
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeFilter === 'all'
                        ? 'bg-white text-gray-800 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter('personal')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeFilter === 'personal'
                        ? 'bg-white text-gray-800 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Personal
                  </button>
                  <button
                    onClick={() => setActiveFilter('group')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeFilter === 'group'
                        ? 'bg-white text-gray-800 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Group
                  </button>
                </div>

                <button
                  onClick={() => handleOpenModal()}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>New <span className='hidden sm:inline'>Reminder</span></span>
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Reminders */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Reminders</h2>
            
            {sortedUpcoming.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No upcoming reminders</h3>
                <p className="text-gray-600 mb-6">Create a new reminder to stay on top of your tasks</p>
                <button
                  onClick={() => handleOpenModal()}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Reminder</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedUpcoming.map((reminder) => {
                  const typeConfig = getTypeConfig(reminder.type);
                  const TypeIcon = typeConfig.icon;
                  const daysUntil = getDaysUntil(reminder.date);
                  const isOverdue = daysUntil === 'Overdue';

                  return (
                    <div 
                      key={reminder.id} 
                      className={`border-l-4 ${
                        isOverdue ? 'border-red-500 bg-red-50' : `border-${typeConfig.color}-500`
                      } rounded-lg p-4 hover:shadow-md transition`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`p-2 rounded-lg bg-${typeConfig.color}-100`}>
                              <TypeIcon className={`w-5 h-5 text-${typeConfig.color}-600`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-800 truncate">
                                {reminder.title}
                              </h3>
                              <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {formatDate(reminder.date)}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {formatTime(reminder.time)}
                                </span>
                                {reminder.recurring && (
                                  <span className="flex items-center text-purple-600">
                                    <Repeat className="w-4 h-4 mr-1" />
                                    {reminder.recurringType}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {reminder.description && (
                            <p className="text-gray-600 text-sm mt-2 ml-12">{reminder.description}</p>
                          )}

                          <div className="flex items-center space-x-2 mt-3 ml-12">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              isOverdue 
                                ? 'bg-red-100 text-red-700'
                                : daysUntil === 'Today' 
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {daysUntil}
                            </span>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-${typeConfig.color}-100 text-${typeConfig.color}-700`}>
                              {typeConfig.label}
                            </span>
                            {!reminder.isPersonal && (
                              <span className="px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                {reminder.groupName}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleComplete(reminder.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Mark as completed"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleOpenModal(reminder)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(reminder.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Completed Reminders */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Completed Reminders ({completedReminders.length})
                </h2>
              </div>
              {showCompleted ? (
                <ChevronUp className="w-6 h-6 text-gray-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-600" />
              )}
            </button>

            {showCompleted && (
              <div className="px-6 pb-6 space-y-4 border-t border-gray-200 pt-4">
                {completedReminders.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No completed reminders</p>
                ) : (
                  completedReminders.map((reminder) => {
                    const typeConfig = getTypeConfig(reminder.type);
                    const TypeIcon = typeConfig.icon;

                    return (
                      <div 
                        key={reminder.id} 
                        className="border-l-4 border-green-500 bg-gray-50 rounded-lg p-4 opacity-75"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="p-2 rounded-lg bg-gray-200">
                                <TypeIcon className="w-5 h-5 text-gray-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-600 truncate line-through">
                                  {reminder.title}
                                </h3>
                                <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                                  <span className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {formatDate(reminder.date)}
                                  </span>
                                  <span>•</span>
                                  <span>Completed on {formatDate(reminder.completedDate)}</span>
                                </div>
                              </div>
                            </div>

                            {reminder.description && (
                              <p className="text-gray-500 text-sm mt-2 ml-12">{reminder.description}</p>
                            )}

                            <div className="flex items-center space-x-2 mt-3 ml-12">
                              <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                                Completed
                              </span>
                              {!reminder.isPersonal && (
                                <span className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-600 rounded-full flex items-center">
                                  <Users className="w-3 h-3 mr-1" />
                                  {reminder.groupName}
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => handleDelete(reminder.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition ml-4"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add/Edit Reminder Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingReminder ? 'Edit Reminder' : 'Create New Reminder'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter reminder title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add details about this reminder"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {reminderTypes.map((type) => {
                    const TypeIcon = type.icon;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: type.value })}
                        className={`p-4 border-2 rounded-lg transition ${
                          formData.type === type.value
                            ? `border-${type.color}-500 bg-${type.color}-50`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <TypeIcon className={`w-6 h-6 mx-auto mb-2 ${
                          formData.type === type.value ? `text-${type.color}-600` : 'text-gray-400'
                        }`} />
                        <span className={`text-sm font-medium ${
                          formData.type === type.value ? 'text-gray-800' : 'text-gray-600'
                        }`}>
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recurrence</label>
                <select
                  value={formData.recurringType}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    recurringType: e.target.value,
                    recurring: e.target.value !== 'none'
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {recurringTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group (Optional)</label>
                <select
                  value={formData.group}
                  onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Personal Reminder</option>
                  {groups.map(group => (
                    <option key={group.id} value={group.name}>{group.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
                >
                  {editingReminder ? 'Update Reminder' : 'Create Reminder'}
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