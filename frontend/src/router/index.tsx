import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '@/components/auth/LoginPage';
import { CallbackPage } from '@/components/auth/CallbackPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ROUTES } from '@/config/constants';

// Temporary dashboard component until we implement the full dashboard
const TempDashboard = () => (
  <div className="min-h-screen bg-pewter-blue-50 p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-pewter-blue-900 mb-6">
        🎙️ Podcast Planner Dashboard
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-pewter-blue-600 mb-4">
          Welcome! Your OAuth authentication is working correctly.
        </p>
        <p className="text-pewter-blue-600">
          The full dashboard will be implemented in Phase 4.
        </p>
      </div>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.CALLBACK,
    element: <CallbackPage />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <TempDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
]);