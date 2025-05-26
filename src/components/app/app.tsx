import '../../index.css';
import styles from './app.module.css';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import {
  Route,
  Routes,
  BrowserRouter,
  useLocation,
  matchPath
} from 'react-router-dom';

import { AppHeader } from '@components';
import { Provider } from 'react-redux';
import { ProtectedRoute } from '../protected-route';
import store from '../../services/store';

import { Modal } from '../modal';
import { OrderInfo } from '../order-info';
import { IngredientDetails } from '../ingredient-details';
import { useNavigate } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

const AppContent = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background || location;
  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        {/* считаю, что делать защищенные маршруты нецелесообразно для login, register, forgot-password, reset-password
            так как если они будут защищены то как тогда совершить вход, регистрацию или восстановить пароль 
            (в теории написано сделать их защищенными) 
        */}
        <Route
          path='/login'
          element={
            // <ProtectedRoute>
            <Login />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            // <ProtectedRoute>
            <Register />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            // <ProtectedRoute>
            <ForgotPassword />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            // <ProtectedRoute>
            <ResetPassword />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {/* Модальные окна */}
      {backgroundLocation !== location && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => navigate(backgroundLocation.pathname)}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Информация о заказе'
                onClose={() => navigate(backgroundLocation.pathname)}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title='Детали заказа'
                  onClose={() => navigate(backgroundLocation.pathname)}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
