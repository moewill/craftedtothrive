import React, { createContext, useContext, ReactNode } from 'react';
import { AuthProvider, useAuth as useOidcAuth, AuthContextProps } from 'react-oidc-context';
import { getOAuthConfig } from '@/config/oauth';

// Extended auth context interface
export interface ExtendedAuthContextProps extends AuthContextProps {
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => string | null;
  getUserProfile: () => any;
  isAuthenticated: boolean;
}

// Create extended auth context
const ExtendedAuthContext = createContext<ExtendedAuthContextProps | null>(null);

// Extended Auth Provider component
export const ExtendedAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const oidcAuth = useOidcAuth();

  const loginWithGoogle = async () => {
    try {
      await oidcAuth.signinRedirect({
        extraQueryParams: { provider: 'google' }
      });
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  };

  const loginWithFacebook = async () => {
    try {
      await oidcAuth.signinRedirect({
        extraQueryParams: { provider: 'facebook' }
      });
    } catch (error) {
      console.error('Facebook login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await oidcAuth.signoutRedirect();
    } catch (error) {
      console.error('Logout failed:', error);
      await oidcAuth.removeUser();
    }
  };

  const getAccessToken = (): string | null => {
    return oidcAuth.user?.access_token || null;
  };

  const getUserProfile = () => {
    return oidcAuth.user?.profile || null;
  };

  const isAuthenticated = !!oidcAuth.user && !oidcAuth.user.expired;

  const extendedAuthValue: ExtendedAuthContextProps = {
    ...oidcAuth,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    getAccessToken,
    getUserProfile,
    isAuthenticated,
  };

  return (
    <ExtendedAuthContext.Provider value={extendedAuthValue}>
      {children}
    </ExtendedAuthContext.Provider>
  );
};

// Main Auth Provider wrapper
export const AppAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to Google OAuth config - can be made dynamic based on user selection
  const oidcConfig = getOAuthConfig('google');

  return (
    <AuthProvider {...oidcConfig}>
      <ExtendedAuthProvider>
        {children}
      </ExtendedAuthProvider>
    </AuthProvider>
  );
};

// Custom hook to use extended auth context
export const useAuth = (): ExtendedAuthContextProps => {
  const context = useContext(ExtendedAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AppAuthProvider');
  }
  return context;
};