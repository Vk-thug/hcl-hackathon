// components/auth/ProtectedRoute.tsx
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { authSelector, authUser } from '@/store/slices/authSlice';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'patient' | 'provider';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthenticated, account, status } = useAppSelector(authSelector);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // If we have a token but no user data, fetch user data
    if (token && !isAuthenticated && status === 'idle') {
      dispatch(authUser());
    }
  }, [token, isAuthenticated, status, dispatch]);

  // Show loading while checking authentication
  if (token && status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // No token or authentication failed - redirect to sign in
  if (!token || (!isAuthenticated && status === 'failed')) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && account?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    if (account?.role === 'provider') {
      return <Navigate to="/provider/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // User is authenticated and has correct role
  return <>{children}</>;
};

// Usage example:
// <Route path="/dashboard" element={
//   <ProtectedRoute requiredRole="patient">
//     <Dashboard />
//   </ProtectedRoute>
// } />