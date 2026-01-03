import React from 'react';
import { TrendingUp, Loader2, DollarSign, PieChart, CreditCard } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Logo with Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-spin" style={{ width: '120px', height: '120px' }}></div>
            
            {/* Middle pulsing ring */}
            <div className="absolute inset-2 rounded-full border-4 border-white/50 animate-pulse" style={{ width: '104px', height: '104px' }}></div>
            
            {/* Inner logo */}
            <div className="relative bg-white rounded-full p-6 shadow-2xl" style={{ width: '120px', height: '120px' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-xl">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 animate-pulse">
          FinManager
        </h1>
        <p className="text-base sm:text-lg text-white/90 mb-8">
          Loading your financial dashboard...
        </p>

        {/* Loading Spinner */}
        <div className="flex justify-center mb-8">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div className="h-full bg-gradient-to-r from-white to-blue-200 rounded-full animate-loading-bar"></div>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="flex justify-center space-x-6 sm:space-x-8 mb-8">
          <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg animate-float-1">
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg animate-float-2">
            <PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg animate-float-3">
            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-white/80 text-sm">
          <p className="animate-pulse">Please wait while we prepare your data</p>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes float-1 {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-2 {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-3 {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }

        .animate-float-1 {
          animation: float-1 3s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 3.5s ease-in-out infinite 0.3s;
        }

        .animate-float-3 {
          animation: float-3 3.2s ease-in-out infinite 0.6s;
        }
      `}</style>
    </div>
  );
}