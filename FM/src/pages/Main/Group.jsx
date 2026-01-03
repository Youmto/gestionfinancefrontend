import React, { useState } from 'react';
import { TrendingUp, Plus, Users, DollarSign, ArrowRight, Menu, X, Home, CreditCard, Bell, Calendar, Settings, LogOut, PieChart, Edit2, Trash2, UserPlus, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

export default function Group() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [activeTab, setActiveTab] = useState('transactions');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'family',
    members: []
  });

  const groupTypes = ['Family', 'Roommates', 'Friends', 'Travel', 'Project', 'Other'];

  // Sample groups data
  const groups = [
    {
      id: 1,
      name: 'Family Budget',
      type: 'Family',
      description: 'Shared family expenses and savings',
      members: 4,
      balance: 2450.75,
      color: 'blue',
      membersList: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: 'JD' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'Member', avatar: 'JD' },
        { id: 3, name: 'Mike Doe', email: 'mike@example.com', role: 'Member', avatar: 'MD' },
        { id: 4, name: 'Sarah Doe', email: 'sarah@example.com', role: 'Member', avatar: 'SD' }
      ],
      transactions: [
        { id: 1, description: 'Grocery Shopping', amount: 250.50, type: 'expense', date: '2026-01-02', paidBy: 'John Doe' },
        { id: 2, description: 'Rent Payment', amount: 1200, type: 'expense', date: '2026-01-01', paidBy: 'Jane Doe' },
        { id: 3, description: 'Utilities', amount: 150, type: 'expense', date: '2025-12-30', paidBy: 'John Doe' }
      ]
    },
    {
      id: 2,
      name: 'Roommates Apartment',
      type: 'Roommates',
      description: 'Split rent and utilities',
      members: 3,
      balance: 1850.00,
      color: 'purple',
      membersList: [
        { id: 5, name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: 'JD' },
        { id: 6, name: 'Alex Smith', email: 'alex@example.com', role: 'Member', avatar: 'AS' },
        { id: 7, name: 'Chris Brown', email: 'chris@example.com', role: 'Member', avatar: 'CB' }
      ],
      transactions: [
        { id: 4, description: 'Internet Bill', amount: 80, type: 'expense', date: '2026-01-01', paidBy: 'Alex Smith' },
        { id: 5, description: 'Electricity', amount: 120, type: 'expense', date: '2025-12-28', paidBy: 'Chris Brown' }
      ]
    },
    {
      id: 3,
      name: 'Summer Vacation 2026',
      type: 'Travel',
      description: 'Trip to Europe expenses',
      members: 5,
      balance: 3200.00,
      color: 'green',
      membersList: [
        { id: 8, name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: 'JD' },
        { id: 9, name: 'Emma Wilson', email: 'emma@example.com', role: 'Member', avatar: 'EW' },
        { id: 10, name: 'David Lee', email: 'david@example.com', role: 'Member', avatar: 'DL' },
        { id: 11, name: 'Lisa Chen', email: 'lisa@example.com', role: 'Member', avatar: 'LC' },
        { id: 12, name: 'Tom Harris', email: 'tom@example.com', role: 'Member', avatar: 'TH' }
      ],
      transactions: [
        { id: 6, description: 'Flight Tickets', amount: 1500, type: 'expense', date: '2025-12-20', paidBy: 'John Doe' },
        { id: 7, description: 'Hotel Booking', amount: 800, type: 'expense', date: '2025-12-18', paidBy: 'Emma Wilson' }
      ]
    },
    {
      id: 4,
      name: 'Weekend Hangouts',
      type: 'Friends',
      description: 'Monthly dinners and activities',
      members: 6,
      balance: 450.25,
      color: 'orange',
      membersList: [
        { id: 13, name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: 'JD' },
        { id: 14, name: 'Kevin Park', email: 'kevin@example.com', role: 'Member', avatar: 'KP' },
        { id: 15, name: 'Rachel Green', email: 'rachel@example.com', role: 'Member', avatar: 'RG' },
        { id: 16, name: 'Monica Ross', email: 'monica@example.com', role: 'Member', avatar: 'MR' },
        { id: 17, name: 'Ross Geller', email: 'ross@example.com', role: 'Member', avatar: 'RG' },
        { id: 18, name: 'Joey Tribbiani', email: 'joey@example.com', role: 'Member', avatar: 'JT' }
      ],
      transactions: [
        { id: 8, description: 'Restaurant Bill', amount: 180, type: 'expense', date: '2025-12-29', paidBy: 'Kevin Park' },
        { id: 9, description: 'Movie Tickets', amount: 90, type: 'expense', date: '2025-12-25', paidBy: 'Rachel Green' }
      ]
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colors[color] || colors.blue;
  };

  const handleCreateGroup = () => {
    console.log('Create group:', formData);
    setShowModal(false);
    setFormData({ name: '', description: '', type: 'family', members: [] });
  };

  const handleInviteMember = () => {
    console.log('Invite member:', inviteEmail);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const handleDeleteGroup = (groupId) => {
    if (confirm('Are you sure you want to delete this group?')) {
      console.log('Delete group:', groupId);
      setSelectedGroup(null);
    }
  };

  

  // Group List View
  if (!selectedGroup) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} Item={"Groups"} />

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
                  <h1 className="text-2xl font-bold text-gray-800">Groups</h1>
                  <p className="text-sm text-gray-500">Manage shared expenses with groups</p>
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
            {/* Header Action */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Create Group</span>
              </button>
            </div>

            {/* Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition cursor-pointer"
                  onClick={() => setSelectedGroup(group)}
                >
                  {/* Group Header with Gradient */}
                  <div className={`bg-gradient-to-r ${getColorClasses(group.color)} p-6 text-white`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <Users className="w-6 h-6" />
                      </div>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                        {group.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{group.name}</h3>
                    <p className="text-white/80 text-sm">{group.description}</p>
                  </div>

                  {/* Group Info */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Members</p>
                        <p className="text-2xl font-bold text-gray-800">{group.members}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Group Balance</p>
                        <p className="text-2xl font-bold text-gray-800">{formatCurrency(group.balance)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex -space-x-2">
                        {group.membersList.slice(0, 4).map((member, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white"
                          >
                            {member.avatar}
                          </div>
                        ))}
                        {group.members > 4 && (
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 text-xs font-semibold border-2 border-white">
                            +{group.members - 4}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>

        {/* Create Group Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Create New Group</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter group name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="What is this group for?"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {groupTypes.map(type => (
                      <option key={type} value={type.toLowerCase()}>{type}</option>
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
                    onClick={handleCreateGroup}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
                  >
                    Create Group
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

  // Group Details View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-600 to-purple-700 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
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
              <button
                onClick={() => setSelectedGroup(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowRight className="w-5 h-5 text-gray-600 rotate-180" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{selectedGroup.name}</h1>
                <p className="text-sm text-gray-500">{selectedGroup.description}</p>
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
          {/* Group Summary Card */}
          <div className={`bg-gradient-to-r ${getColorClasses(selectedGroup.color)} rounded-2xl p-6 text-white shadow-lg mb-8`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-white/80 text-sm mb-1">Total Members</p>
                <p className="text-4xl font-bold">{selectedGroup.members}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Group Balance</p>
                <p className="text-4xl font-bold">{formatCurrency(selectedGroup.balance)}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Total Transactions</p>
                <p className="text-4xl font-bold">{selectedGroup.transactions.length}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`py-4 border-b-2 font-semibold transition ${
                    activeTab === 'transactions'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Transactions
                </button>
                <button
                  onClick={() => setActiveTab('members')}
                  className={`py-4 border-b-2 font-semibold transition ${
                    activeTab === 'members'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Members
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-4 border-b-2 font-semibold transition ${
                    activeTab === 'settings'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Settings
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Transactions Tab */}
              {activeTab === 'transactions' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Group Transactions</h3>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition text-sm font-semibold">
                      <Plus className="w-4 h-4" />
                      <span>Add Transaction</span>
                    </button>
                  </div>

                  {selectedGroup.transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition border border-gray-100">
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
                          <p className="text-sm text-gray-500">Paid by {transaction.paidBy} • {formatDate(transaction.date)}</p>
                        </div>
                      </div>
                      <span className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Members Tab */}
              {activeTab === 'members' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Group Members</h3>
                    <button
                      onClick={() => setShowInviteModal(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition text-sm font-semibold"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Invite Member</span>
                    </button>
                  </div>

                  {selectedGroup.membersList.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition border border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          member.role === 'Admin' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {member.role}
                        </span>
                        {member.role !== 'Admin' && (
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                    <input
                      type="text"
                      value={selectedGroup.name}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={selectedGroup.description}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Danger Zone</h4>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition font-semibold">
                        Leave Group
                      </button>
                      <button
                        onClick={() => handleDeleteGroup(selectedGroup.id)}
                        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                      >
                        Delete Group
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Invite Member</h2>
              <button onClick={() => setShowInviteModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="member@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInviteMember}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
                >
                  Send Invite
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