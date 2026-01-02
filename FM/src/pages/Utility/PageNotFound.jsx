import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Home, ArrowLeft, Search, Mail, HelpCircle, FileQuestion } from 'lucide-react';

export default function PageNotFound() {
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Transactions', icon: TrendingUp, path: '/transactions' },
    { name: 'Groups', icon: HelpCircle, path: '/groups' },
    { name: 'Reminders', icon: Mail, path: '/reminders' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FinManager
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                404
              </div>
              <div className="absolute -top-4 -right-4 sm:-right-6">
                <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-full p-3 sm:p-4 shadow-lg animate-bounce">
                  <FileQuestion className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Oops! Page Not Found
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on track!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-semibold shadow-lg"
            >
              <Home className="w-5 h-5" />
              <span>Go to Dashboard</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Quick Links
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <button
                    key={link.name}
                    onClick={() => navigate(link.path)}
                    className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 rounded-xl transition group"
                  >
                    <div className="bg-white p-3 rounded-lg shadow-sm group-hover:shadow-md transition mb-2">
                      <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {link.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? Contact our{' '}
              <a href="/support" className="text-blue-600 hover:text-blue-700 font-medium">
                support team
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Error Code: 404 | Page Not Found</p>
        </div>
      </div>
    </div>
  );
}