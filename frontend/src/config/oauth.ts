import { WebStorageStateStore } from 'oidc-client-ts';

export interface OAuthConfig {
  authority: string;
  client_id: string;
  redirect_uri: string;
  scope: string;
  response_type: string;
  post_logout_redirect_uri: string;
}

// Google OAuth 2.0 Configuration
export const googleOAuthConfig: OAuthConfig = {
  authority: 'https://accounts.google.com',
  client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  redirect_uri: `${window.location.origin}/auth/callback`,
  scope: 'openid profile email',
  response_type: 'code',
  post_logout_redirect_uri: window.location.origin,
};

// Facebook OAuth 2.0 Configuration  
export const facebookOAuthConfig: OAuthConfig = {
  authority: 'https://www.facebook.com/v18.0',
  client_id: import.meta.env.VITE_FACEBOOK_CLIENT_ID || '',
  redirect_uri: `${window.location.origin}/auth/callback`,
  scope: 'openid profile email',
  response_type: 'code',
  post_logout_redirect_uri: window.location.origin,
};

// Common OIDC Client Settings
export const commonOidcSettings = {
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: true,
  includeIdTokenInSilentRenew: true,
  silentRequestTimeoutInSeconds: 30,
  loadUserInfo: true,
  monitorSession: true,
  checkSessionIntervalInSeconds: 10,
  revokeTokenTypes: ['refresh_token', 'access_token'],
};

// Environment-specific configurations
export const getOAuthConfig = (provider: 'google' | 'facebook') => {
  const baseConfig = provider === 'google' ? googleOAuthConfig : facebookOAuthConfig;
  
  // Development configuration
  if (import.meta.env.DEV) {
    return {
      ...baseConfig,
      ...commonOidcSettings,
    };
  }
  
  // Production configuration
  return {
    ...baseConfig,
    ...commonOidcSettings,
    redirect_uri: `${window.location.origin}/auth/callback`,
    post_logout_redirect_uri: window.location.origin,
  };
};