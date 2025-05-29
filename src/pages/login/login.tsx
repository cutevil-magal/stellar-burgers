import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/slices/loginSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUser } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, error } = useSelector((state) => state.login);
  const errorText = error || '';
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  // useEffect(() => {
  //   if (user) {
  //     // dispatch(getUser());
  //     navigate('/'); // на главную страницу
  //     // navigate(location.state?.from || '/profile', { replace: true });
  //   }
  // }, [user, navigate, location]);
  const isLoading = useSelector((state) => state.user.isLoading);
  useEffect(() => {
    if (!isLoading && user) {
      dispatch(getUser());
      const redirectPath = location.state?.from || '/';
      navigate(redirectPath, { replace: true });
    }
  }, [user, isLoading, navigate, location.state?.from]);

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
