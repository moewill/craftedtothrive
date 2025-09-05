import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  fallbackPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallbackPath = '/login' 
}) => {
  const { isLoading, isAuthenticated, activeNavigator, error } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading || activeNavigator === 'signinRedirect') {
    return (
      <div className="min-h-screen bg-pewter-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-coral-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pewter-blue-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Show error state if authentication failed
  if (error) {
    return (
      <div className="min-h-screen bg-pewter-blue-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-baby-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-pewter-blue-900 mb-2">
            Authentication Error
          </h2>
          <p className="text-pewter-blue-600 mb-4">
            {error.message || 'An error occurred during authentication.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-coral-500 hover:bg-coral-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Preserve the intended destination for post-login redirect
    return (
      <Navigate 
        to={fallbackPath} 
        state={{ from: location.pathname + location.search }} 
        replace 
      />
    );
  }

  // Render protected content
  return <>{children}</>;
};