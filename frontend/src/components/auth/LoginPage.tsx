import React from 'react';
import { GoogleLoginButton, FacebookLoginButton } from './LoginButton';
import { APP_NAME } from '@/config/constants';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pewter-blue-50 to-cookies-cream-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-coral-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-pewter-blue-900 mb-2">
              Welcome to {APP_NAME}
            </h1>
            <p className="text-pewter-blue-600">
              Plan, create, and launch your podcast journey
            </p>
          </div>

          {/* Login Options */}
          <div className="space-y-4">
            <GoogleLoginButton />
            <FacebookLoginButton />
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-pewter-blue-500">
              By signing in, you agree to our{' '}
              <a href="#" className="text-coral-600 hover:text-coral-700 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-coral-600 hover:text-coral-700 underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-pewter-blue-600 text-sm">
            🎙️ Your comprehensive guide to podcast success
          </p>
        </div>
      </div>
    </div>
  );
};