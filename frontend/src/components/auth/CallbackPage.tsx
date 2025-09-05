import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface CallbackState {
  status: 'loading' | 'success' | 'error';
  error?: string;
  redirectTo?: string;
}

export const CallbackPage: React.FC = () => {
  const { signinRedirectCallback, isAuthenticated, user } = useAuth();
  const [state, setState] = useState<CallbackState>({ status: 'loading' });
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Get the intended redirect destination from state or default to dashboard
  const redirectTo = location.state?.from || '/dashboard';

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for OAuth error parameters
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          setState({
            status: 'error',
            error: errorDescription || `OAuth Error: ${error}`
          });
          return;
        }

        // Process the OAuth callback
        await signinRedirectCallback();
        
        setState({ status: 'success', redirectTo });
      } catch (error: any) {
        console.error('OAuth callback failed:', error);
        setState({
          status: 'error',
          error: error.message || 'Authentication failed. Please try again.'
        });
      }
    };

    // Only run callback if not already authenticated
    if (!isAuthenticated) {
      handleCallback();
    } else {
      setState({ status: 'success', redirectTo });
    }
  }, [signinRedirectCallback, isAuthenticated, searchParams, redirectTo]);

  // Loading state
  if (state.status === 'loading') {
    return (
      <div className="min-h-screen bg-pewter-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-coral-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-pewter-blue-900 mb-2">
            Completing Sign In
          </h2>
          <p className="text-pewter-blue-600">
            Please wait while we authenticate your account...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.status === 'error') {
    return (
      <div className="min-h-screen bg-pewter-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-baby-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-pewter-blue-900 mb-4">
            Sign In Failed
          </h2>
          <p className="text-pewter-blue-600 mb-6">
            {state.error}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/login'}
              className="w-full bg-coral-500 hover:bg-coral-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-pewter-blue-100 hover:bg-pewter-blue-200 text-pewter-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state - redirect to intended destination
  if (state.status === 'success' && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Fallback - shouldn't reach here but redirect to login
  return <Navigate to="/login" replace />;
};