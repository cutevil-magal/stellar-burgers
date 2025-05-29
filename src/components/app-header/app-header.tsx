import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  // return <AppHeaderUI userName={user?.name || ''} />;
  return <AppHeaderUI userName={isLoading ? 'Загрузка...' : user?.name} />;
};
