import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
