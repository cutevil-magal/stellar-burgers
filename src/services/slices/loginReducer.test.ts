import { expect, test, describe } from '@jest/globals';
import loginReducer, {
  logout,
  loginUser
} from './loginSlice';
import { TAuthResponse } from '../../utils/burger-api';

// Мок ответ API
const mockResponse: TAuthResponse = {
  success: true,
  user: {
    email: 'anna.magal@gmail.com',
    name: 'AnnaCute'
  },
  accessToken: 'mockAccessToken',
  refreshToken: 'mockRefreshToken'
};

describe('Проверка редьюсера [loginReducer]', () => {
  test('loginUser.pending: запускает загрузку и очищает ошибку', () => {
    // Экшен, который запускается при начале login-запроса
    const action = { type: loginUser.pending.type };
    const initialState = {
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: 'Ошибка'
    };
    const state = loginReducer(initialState, action);
    // Проверяем: включилась загрузка, ошибка сброшена
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('loginUser.fulfilled: сохраняет пользователя и токены', () => {
    // Успешный экшен с payload — это ответ от сервера
    const action = { type: loginUser.fulfilled.type, payload: mockResponse };
    const initialState = {
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: true,
      error: null
    };
    const state = loginReducer(initialState, action);
    // Проверяем: токены и пользователь сохранились, загрузка выключена
    expect(state.user).toEqual(mockResponse.user);
    expect(state.accessToken).toBe(mockResponse.accessToken);
    expect(state.refreshToken).toBe(mockResponse.refreshToken);
    expect(state.isLoading).toBe(false);
  });

  test('loginUser.rejected: записывает ошибку и завершает загрузку', () => {
    // Экшен ошибки — payload содержит текст ошибки
    const action = {
      type: loginUser.rejected.type,
      payload: 'Ошибка'
    };
    const initialState = {
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: true,
      error: null
    };
    const state = loginReducer(initialState, action);
    // Проверяем: ошибка записалась, загрузка выключена
    expect(state.error).toBe('Ошибка');
    expect(state.isLoading).toBe(false);
  });

  test('logout: очищает пользователя и токены', () => {
    // Предварительно заполненное состояние
    const initialState = {
      user: mockResponse.user,
      accessToken: mockResponse.accessToken,
      refreshToken: mockResponse.refreshToken,
      isLoading: false,
      error: null
    };
    const state = loginReducer(initialState, logout());
    // Проверяем: все поля обнулены
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
  });
});
