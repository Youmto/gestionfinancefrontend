import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle, Clock, DollarSign, XCircle, ArrowLeft, TrendingUp } from 'lucide-react';

export default function Reset() {
  const [step, setStep] = useState('request'); // 'request', 'sent', 'reset', 'success'
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password)
    };
  };

  const handleRequestReset = () => {
    setErrors({});
    
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Reset email sent to:', email);
      setIsLoading(false);
      setStep('sent');
    }, 1500);
  };

  const handleResetPassword = () => {
    const newErrors = {};

    if (!newPassword) {
      newErrors.newPassword = 'Password is required';
    }

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.length || !passwordValidation.uppercase || 
        !passwordValidation.lowercase || !passwordValidation.number) {
      newErrors.newPassword = 'Password does not meet requirements';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Password reset successful');
      setIsLoading(false);
      setStep('success');
    }, 1500);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({});
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (errors.newPassword) {
      setErrors({ ...errors, newPassword: null });
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) {
      setErrors({ ...errors, confirmPassword: null });
    }
  };

  const passwordValidation = validatePassword(newPassword);

  // Request Reset Step
  if (step === 'request') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left side - Branding */}
          <div className="hidden md:flex flex-col justify-center space-y-6 p-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-2xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800">
                  Financial Manager
                </h1>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Take control of your finances and time in one powerful platform
              </p>
            </div>

            <div className="space-y-4 pt-8">
              <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Track Expenses</h3>
                  <p className="text-sm text-gray-600">Monitor income and expenses with detailed insights</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Manage Time</h3>
                  <p className="text-sm text-gray-600">Set reminders and organize events seamlessly</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                <div className="bg-green-100 p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Collaborate</h3>
                  <p className="text-sm text-gray-600">Share expenses with groups and manage together</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Request Reset Form */} 
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-2xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
              <p className="text-gray-600">Enter your email address and we'll send you a link to reset your password</p>
            </div>

            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full pl-11 pr-4 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleRequestReset}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              {/* Back to Login */}
              <div className="text-center pt-4">
                <a href="#" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Email Sent Step
  if (step === 'sent') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 text-center">
            {/* Icon */}
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-12 h-12 text-blue-600" />
            </div>

            {/* Content */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <span className="font-semibold text-gray-800">{email}</span>
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Click the link in the email to reset your password. If you don't see the email, check your spam folder.
            </p>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={() => setStep('reset')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-200 shadow-lg"
              >
                I Have the Reset Link
              </button>

              <button
                onClick={handleRequestReset}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-200"
              >
                Resend Email
              </button>

              <div className="pt-2">
                <a href="#" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Reset Password Step
  if (step === 'reset') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-2xl">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create New Password</h2>
              <p className="text-gray-600">Your new password must be different from previously used passwords</p>
            </div>

            <div className="space-y-5">
              {/* New Password Field */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    className={`w-full pl-11 pr-12 py-3 border ${errors.newPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Requirements */}
                {newPassword && (
                  <div className="mt-3 space-y-2">
                    <div className={`flex items-center text-sm ${passwordValidation.length ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.length ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                      At least 8 characters
                    </div>
                    <div className={`flex items-center text-sm ${passwordValidation.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.uppercase ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                      One uppercase letter
                    </div>
                    <div className={`flex items-center text-sm ${passwordValidation.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.lowercase ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                      One lowercase letter
                    </div>
                    <div className={`flex items-center text-sm ${passwordValidation.number ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordValidation.number ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                      One number
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={`w-full pl-11 pr-12 py-3 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {errors.confirmPassword}
                  </p>
                )}
                {confirmPassword && !errors.confirmPassword && newPassword === confirmPassword && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Passwords match
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Resetting...
                  </span>
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success Step
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 text-center">
          {/* Success Icon */}
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Content */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Password Reset Successful!</h2>
          <p className="text-gray-600 mb-8">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>

          {/* Action Button */}
          <button
            onClick={() => window.location.href = '#'}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-200 shadow-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}