import { Navigate } from 'react-router-dom';
import { useSelector } from '../../store';

type TProtectedRouteType = 'auth' | 'unauth';

type ProtectedRouteProps = {
  children: React.ReactElement;
  type: TProtectedRouteType;
};

export const ProtectedRoute = ({ children, type }: ProtectedRouteProps) => {
  const { isAuthChecked, loading, authorized } = useSelector(
    (state) => state.user
  );
  // const location = useLocation();
  // const from = location.state?.from || '/';

  if (type === 'auth' && !authorized && isAuthChecked && !loading) {
    return <Navigate to="/auth" />;
  }

  if (type === 'unauth' && authorized && isAuthChecked && !loading) {
    return <Navigate to="/home" />;
  }

  return children;
};
