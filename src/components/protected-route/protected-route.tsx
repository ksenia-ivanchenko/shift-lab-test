import { Navigate } from 'react-router-dom';
import { useSelector } from '../../store';
import { Preloader } from '../ui/preloader';

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

  if (!isAuthChecked || loading) {
    return <Preloader />;
  }

  if (type === 'auth' && !authorized) {
    return <Navigate to="/auth/phone" />;
  }

  if (type === 'unauth' && authorized) {
    return <Navigate to="/home" />;
  }

  return children;
};
