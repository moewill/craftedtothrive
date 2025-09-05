import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GoogleLoginButton, FacebookLoginButton } from './LoginButton';
import * as AuthContext from '@/contexts/AuthContext';

// Mock the auth context
const mockAuth = {
  loginWithGoogle: vi.fn(),
  loginWithFacebook: vi.fn(),
  isAuthenticated: false,
  user: null,
  isLoading: false,
  getAccessToken: vi.fn(),
  getUserProfile: vi.fn(),
};

vi.spyOn(AuthContext, 'useAuth').mockReturnValue(mockAuth as any);

describe('LoginButton Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GoogleLoginButton', () => {
    it('renders correctly', () => {
      render(<GoogleLoginButton />);
      
      expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument();
      expect(screen.getByText('Continue with Google')).toBeInTheDocument();
    });

    it('calls loginWithGoogle when clicked', async () => {
      render(<GoogleLoginButton />);
      
      const button = screen.getByRole('button', { name: /continue with google/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockAuth.loginWithGoogle).toHaveBeenCalledOnce();
      });
    });

    it('shows loading state when clicked', async () => {
      mockAuth.loginWithGoogle.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      
      render(<GoogleLoginButton />);
      
      const button = screen.getByRole('button', { name: /continue with google/i });
      fireEvent.click(button);

      expect(screen.getByText('Signing in...')).toBeInTheDocument();
      expect(button).toBeDisabled();
    });

    it('can be disabled', () => {
      render(<GoogleLoginButton disabled />);
      
      const button = screen.getByRole('button', { name: /continue with google/i });
      expect(button).toBeDisabled();
    });

    it('handles login errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockAuth.loginWithGoogle.mockRejectedValue(new Error('Login failed'));
      
      render(<GoogleLoginButton />);
      
      const button = screen.getByRole('button', { name: /continue with google/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('google login failed:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });
  });

  describe('FacebookLoginButton', () => {
    it('renders correctly', () => {
      render(<FacebookLoginButton />);
      
      expect(screen.getByRole('button', { name: /continue with facebook/i })).toBeInTheDocument();
      expect(screen.getByText('Continue with Facebook')).toBeInTheDocument();
    });

    it('calls loginWithFacebook when clicked', async () => {
      render(<FacebookLoginButton />);
      
      const button = screen.getByRole('button', { name: /continue with facebook/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockAuth.loginWithFacebook).toHaveBeenCalledOnce();
      });
    });

    it('has correct styling for Facebook branding', () => {
      render(<FacebookLoginButton />);
      
      const button = screen.getByRole('button', { name: /continue with facebook/i });
      expect(button).toHaveClass('bg-blue-600');
    });
  });
});