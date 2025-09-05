import { vi } from 'vitest';

// Mock user object
export const mockUser = {
  access_token: 'mock-access-token',
  id_token: 'mock-id-token',
  profile: {
    sub: '123456789',
    name: 'Test User',
    email: 'test@example.com',
    picture: 'https://example.com/avatar.jpg',
  },
  expired: false,
  expires_at: Date.now() + 3600000, // 1 hour from now
  expires_in: 3600,
  scope: 'openid profile email',
  token_type: 'Bearer',
};

// Mock auth context
export const mockAuthContext = {
  user: mockUser,
  isLoading: false,
  isAuthenticated: true,
  activeNavigator: undefined,
  error: undefined,
  signinRedirect: vi.fn().mockResolvedValue(void 0),
  signinRedirectCallback: vi.fn().mockResolvedValue(mockUser),
  signoutRedirect: vi.fn().mockResolvedValue(void 0),
  removeUser: vi.fn().mockResolvedValue(void 0),
  clearStaleState: vi.fn().mockResolvedValue(void 0),
  querySessionStatus: vi.fn().mockResolvedValue(void 0),
  revokeTokens: vi.fn().mockResolvedValue(void 0),
  startSilentRenew: vi.fn().mockResolvedValue(void 0),
  stopSilentRenew: vi.fn().mockResolvedValue(void 0),
  signinSilent: vi.fn().mockResolvedValue(mockUser),
  signinSilentCallback: vi.fn().mockResolvedValue(void 0),
  signinResourceOwnerCredentials: vi.fn().mockResolvedValue(mockUser),
  signinCallback: vi.fn().mockResolvedValue(mockUser),
  signoutCallback: vi.fn().mockResolvedValue(void 0),
  signoutPopup: vi.fn().mockResolvedValue(void 0),
  signoutPopupCallback: vi.fn().mockResolvedValue(void 0),
  signinPopup: vi.fn().mockResolvedValue(mockUser),
  signinPopupCallback: vi.fn().mockResolvedValue(void 0),
  settings: {},
};

// Mock unauthenticated context
export const mockUnauthenticatedContext = {
  ...mockAuthContext,
  user: null,
  isAuthenticated: false,
};

// Mock loading context
export const mockLoadingContext = {
  ...mockAuthContext,
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

// Mock error context
export const mockErrorContext = {
  ...mockAuthContext,
  user: null,
  isAuthenticated: false,
  error: { message: 'Authentication failed' },
};

// Export the mocks
export const useAuth = vi.fn().mockReturnValue(mockAuthContext);
export const AuthProvider = vi.fn().mockImplementation(({ children }) => children);