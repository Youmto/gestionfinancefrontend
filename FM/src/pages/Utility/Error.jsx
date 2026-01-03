import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, AlertTriangle, RefreshCw, Home, Mail, ArrowLeft, WifiOff, ServerCrash, XCircle } from 'lucide-react';

export default function Error({ 
  errorCode = '500',
  errorTitle = 'Something Went Wrong',
  errorMessage = 'We encountered an unexpected error. Please try again or contact support if the problem persists.',
  showRetry = true,
  onRetry = null
}) {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const troubleshootingTips = [
    {
      icon: RefreshCw,
      title: 'Refresh the page',
      description: 'Sometimes a simple refresh can fix the issue'
    },
    {
      icon: WifiOff,
      title: 'Check your connection',
      description: 'Make sure you have a stable internet connection'
    },
    {
      icon: ServerCrash,
      title: 'Try again later',
      description: 'Our servers might be experiencing issues'
    }
  ];

  const getErrorIcon = () => {
    switch (errorCode) {
      case '403':
        return XCircle;
      case '500':
      case '502':
      case '503':
        return ServerCrash;
      default:
        return AlertTriangle;
    }
  };

  const ErrorIcon = getErrorIcon();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
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

        {/* Main Error Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 mb-6">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-red-500 to-orange-500 rounded-full p-6 shadow-lg">
                <ErrorIcon className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div className="text-center mb-4">
            <div className="inline-block px-4 py-2 bg-red-100 rounded-full mb-4">
              <span className="text-red-600 font-bold text-sm sm:text-base">Error {errorCode}</span>
            </div>
          </div>

          {/* Error Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-3">
            {errorTitle}
          </h1>

          {/* Error Message */}
          <p className="text-sm sm:text-base text-gray-600 text-center mb-8 max-w-xl mx-auto">
            {errorMessage}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
            {showRetry && (
              <button
                onClick={handleRetry}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-semibold shadow-lg"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </button>
            )}
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-semibold"
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-8"></div>

          {/* Troubleshooting Tips */}
          <div className="mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 text-center mb-6">
              Troubleshooting Tips
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {troubleshootingTips.map((tip, index) => {
                const TipIcon = tip.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-blue-100 p-3 rounded-lg mb-3">
                        <TipIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
                        {tip.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Support Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                Still Having Issues?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Our support team is here to help. Contact us and we'll get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:support@finmanager.com"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Support</span>
                </a>
                <a
                  href="/help"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                >
                  <span>Visit Help Center</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Error Details (for debugging) */}
        <div className="text-center mt-6 text-xs sm:text-sm text-gray-500">
          <p>Error Code: {errorCode} | {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

// Example usage with different error types
export function Error403() {
  return (
    <ErrorPage
      errorCode="403"
      errorTitle="Access Forbidden"
      errorMessage="You don't have permission to access this resource. Please contact your administrator if you believe this is an error."
      showRetry={false}
    />
  );
}

export function Error500() {
  return (
    <ErrorPage
      errorCode="500"
      errorTitle="Internal Server Error"
      errorMessage="We're experiencing technical difficulties. Our team has been notified and is working to fix the issue."
    />
  );
}

export function Error503() {
  return (
    <ErrorPage
      errorCode="503"
      errorTitle="Service Unavailable"
      errorMessage="The service is temporarily unavailable. We're performing maintenance and will be back shortly."
    />
  );
}

export function NetworkError() {
  return (
    <ErrorPage
      errorCode="Network"
      errorTitle="Connection Error"
      errorMessage="Unable to connect to the server. Please check your internet connection and try again."
    />
  );
}