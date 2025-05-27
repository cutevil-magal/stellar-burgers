import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { FC } from 'react';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const token = localStorage.getItem('accessToken');

  if (!user && !token) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
