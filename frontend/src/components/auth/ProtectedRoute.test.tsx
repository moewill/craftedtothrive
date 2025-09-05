import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import * as AuthContext from '@/contexts/AuthContext';

// Mock react-router-dom Navigate component
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: ({ to, state }: { to: string; state?: any }) => {
      mockNavigate(to, state);
      return <div data-testid="navigate" data-to={to} />;
    },
  };
});

const TestComponent = () => <div data-testid="protected-content">Protected Content</div>;

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ProtectedRoute', () => {
  it('shows loading state when authentication is loading', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      isLoading: true,
      isAuthenticated: false,
      activeNavigator: undefined,
      error: undefined,
    } as any);

    renderWithRouter(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>
    );

    expect(screen.getByText('Verifying authentication...')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('shows loading state when signin redirect is active', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
      activeNavigator: 'signinRedirect',
      error: undefined,
    } as any);

    renderWithRouter(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>
    );

    expect(screen.getByText('Verifying authentication...')).toBeInTheDocument();
  });

  it('shows error state when authentication fails', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
      activeNavigator: undefined,
      error: { message: 'Authentication failed' },
    } as any);

    renderWithRouter(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>
    );

    expect(screen.getByText('Authentication Error')).toBeInTheDocument();
    expect(screen.getByText('Authentication failed')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
      activeNavigator: undefined,
      error: undefined,
    } as any);

    renderWithRouter(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>
    );

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/login');
  });

  it('redirects to custom fallback path when not authenticated', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
      activeNavigator: undefined,
      error: undefined,
    } as any);

    renderWithRouter(
      <ProtectedRoute fallbackPath="/custom-login">
        <TestComponent />
      </ProtectedRoute>
    );

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/custom-login');
  });

  it('renders children when authenticated', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
      activeNavigator: undefined,
      error: undefined,
    } as any);

    renderWithRouter(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });
});