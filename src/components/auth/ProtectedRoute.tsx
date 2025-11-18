import { Navigate, Outlet } from 'react-router';

export default function ProtectedRoute() {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
