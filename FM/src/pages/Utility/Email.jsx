import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TrendingUp, Mail, CheckCircle, XCircle, Loader2, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

export default function Email() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error, expired
  const [countdown, setCountdown] = useState(5);

  // Get token from URL parameters
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    // Simulate email verification API call
    const verifyEmail = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate verification logic
        if (!token) {
          setStatus('error');
          return;
        }

        // Random success/error for demo (replace with actual API call)
        const isValid = Math.random() > 0.3; // 70% success rate for demo
        
        if (isValid) {
          setStatus('success');
        } else {
          setStatus('expired');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [token]);

  // Auto redirect on success
  useEffect(() => {
    if (status === 'success' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (status === 'success' && countdown === 0) {
      navigate('/login');
    }
  }, [status, countdown, navigate]);

  const handleResendEmail = () => {
    console.log('Resend verification email to:', email);
    alert('Verification email has been resent! Please check your inbox.');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleGoToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
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

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
          {/* Verifying State */}
          {status === 'verifying' && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-6 shadow-lg">
                    <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-white animate-spin" />
                  </div>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                Verifying Your Email
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Please wait while we confirm your email address...
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  {email || 'your email address'}
                </p>
              </div>
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-green-500 to-emerald-500 rounded-full p-6 shadow-lg animate-bounce-once">
                    <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                Email Verified Successfully!
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Your email has been confirmed. You can now access all features of FinManager.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-green-800">
                  <Mail className="w-5 h-5" />
                  <p className="text-sm font-medium">
                    {email || 'Email verified'}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  Redirecting to login in <span className="font-bold">{countdown}</span> seconds...
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleGoToLogin}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-semibold shadow-lg"
                >
                  <span>Go to Login</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleGoToDashboard}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-semibold"
                >
                  Dashboard
                </button>
              </div>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-red-500 to-orange-500 rounded-full p-6 shadow-lg">
                    <XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                Verification Failed
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                We couldn't verify your email address. The verification link may be invalid or corrupted.
              </p>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-red-800 mb-1">
                      Possible reasons:
                    </p>
                    <ul className="text-xs text-red-700 space-y-1 list-disc list-inside">
                      <li>Invalid verification link</li>
                      <li>Link has been used already</li>
                      <li>Technical error occurred</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleResendEmail}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-semibold shadow-lg"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Resend Email</span>
                </button>
                <button
                  onClick={handleGoToLogin}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-semibold"
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}

          {/* Expired State */}
          {status === 'expired' && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full p-6 shadow-lg">
                    <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                Link Expired
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                This verification link has expired. Please request a new verification email.
              </p>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-orange-800">
                  Verification links expire after 24 hours for security reasons.
                </p>
              </div>

              {email && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center space-x-2 text-blue-800">
                    <Mail className="w-5 h-5" />
                    <p className="text-sm">
                      {email}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleResendEmail}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-semibold shadow-lg"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Send New Link</span>
                </button>
                <button
                  onClick={handleGoToLogin}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-semibold"
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              Need help?{' '}
              <a href="/support" className="text-blue-600 hover:text-blue-700 font-medium">
                Contact Support
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        {status === 'success' && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-4 border-l-4 border-green-500">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  What's Next?
                </h3>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Log in to your account</li>
                  <li>• Complete your profile setup</li>
                  <li>• Start managing your finances</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes bounce-once {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animate-bounce-once {
          animation: bounce-once 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}