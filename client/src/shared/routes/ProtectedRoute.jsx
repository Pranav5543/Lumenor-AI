import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, roles }) {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const allowed = !roles || roles.includes(user?.role);

  if (!user) return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  if (!allowed) return <Navigate to="/" replace />;
  return children;
}
