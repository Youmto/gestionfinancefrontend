import React, { useState } from 'react';
import { X, Users, Tag, Image, UserPlus, Mail, Trash2, Check } from 'lucide-react';

export default function CreateGroupModal({ isOpen, onClose, onSubmit, editingGroup = null }) {
  const [formData, setFormData] = useState({
    name: editingGroup?.name || '',
    description: editingGroup?.description || '',
    category: editingGroup?.category || 'general',
    color: editingGroup?.color || 'blue',
    image: editingGroup?.image || null,
    members: editingGroup?.members || []
  });

  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberName, setNewMemberName] = useState('');

  const groupCategories = [
    { value: 'general', label: 'General' },
    { value: 'household', label: 'Household' },
    { value: 'vacation', label: 'Vacation' },
    { value: 'event', label: 'Event' },
    { value: 'project', label: 'Project' },
    { value: 'roommates', label: 'Roommates' },
    { value: 'family', label: 'Family' },
    { value: 'friends', label: 'Friends' }
  ];

  const colorOptions = [
    { value: 'blue', label: 'Blue', bg: 'bg-blue-500' },
    { value: 'purple', label: 'Purple', bg: 'bg-purple-500' },
    { value: 'green', label: 'Green', bg: 'bg-green-500' },
    { value: 'red', label: 'Red', bg: 'bg-red-500' },
    { value: 'orange', label: 'Orange', bg: 'bg-orange-500' },
    { value: 'pink', label: 'Pink', bg: 'bg-pink-500' },
    { value: 'yellow', label: 'Yellow', bg: 'bg-yellow-500' },
    { value: 'indigo', label: 'Indigo', bg: 'bg-indigo-500' }
  ];

  const handleAddMember = () => {
    if (!newMemberEmail || !newMemberName) {
      alert('Please enter both name and email');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newMemberEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    // Check for duplicate emails
    if (formData.members.some(m => m.email === newMemberEmail)) {
      alert('This member is already added');
      return;
    }

    const newMember = {
      id: Date.now(),
      name: newMemberName,
      email: newMemberEmail,
      role: 'member',
      status: 'pending'
    };

    setFormData({
      ...formData,
      members: [...formData.members, newMember]
    });

    setNewMemberName('');
    setNewMemberEmail('');
  };

  const handleRemoveMember = (memberId) => {
    setFormData({
      ...formData,
      members: formData.members.filter(m => m.id !== memberId)
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      alert('Please enter a group name');
      return;
    }

    if (formData.members.length === 0) {
      alert('Please add at least one member to the group');
      return;
    }

    const groupData = {
      ...formData,
      id: editingGroup?.id || Date.now(),
      createdAt: editingGroup?.createdAt || new Date().toISOString(),
      createdBy: editingGroup?.createdBy || 'current-user-id'
    };

    onSubmit(groupData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      category: 'general',
      color: 'blue',
      image: null,
      members: []
    });
    setNewMemberEmail('');
    setNewMemberName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {editingGroup ? 'Edit Group' : 'Create New Group'}
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
          {/* Group Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full ${
                formData.image ? '' : `bg-${formData.color}-100`
              } flex items-center justify-center overflow-hidden border-4 border-gray-200`}>
                {formData.image ? (
                  <img src={formData.image} alt="Group" className="w-full h-full object-cover" />
                ) : (
                  <Users className={`w-12 h-12 sm:w-16 sm:h-16 text-${formData.color}-600`} />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition shadow-lg">
                <Image className="w-4 h-4" />
                <input
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Group Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Group Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Family Budget, Roommates Apartment"
              required
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What is this group for?"
              rows="3"
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm sm:text-base"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base appearance-none"
              >
                {groupCategories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Group Color</label>
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
                >
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${color.bg} mx-auto`}></div>
                  {formData.color === color.value && (
                    <div className="absolute -top-1 -right-1 bg-gray-800 rounded-full p-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Members Section */}
          <div className="border-t border-gray-200 pt-4 sm:pt-5">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Group Members</h3>
            
            {/* Add Member Form */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Name</label>
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Add Member</span>
                </button>
              </div>
            </div>

            {/* Members List */}
            {formData.members.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-3">
                  {formData.members.length} member{formData.members.length !== 1 ? 's' : ''} added
                </p>
                {formData.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm truncate">{member.name}</p>
                        <p className="text-xs text-gray-500 truncate">{member.email}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition flex-shrink-0"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No members added yet</p>
                <p className="text-xs text-gray-500 mt-1">Add members to start sharing expenses</p>
              </div>
            )}
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
              {editingGroup ? 'Update Group' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}