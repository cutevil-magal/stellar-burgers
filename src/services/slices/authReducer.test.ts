import { expect, test, describe } from '@jest/globals';
import authReducer, { logout, registerUser } from './authSlice';
import { TAuthResponse } from '../../utils/burger-api';

// Моковые данные
const mockResponse: TAuthResponse = {
  success: true,
  user: {
    email: 'anna.magal@gmail.com',
    name: 'AnnaCute'
  },
  accessToken: 'mockAccessToken',
  refreshToken: 'mockRefreshToken'
};

describe('Проверка редьюсера [authReducer]', () => {
  test('pending: устанавливает isLoading в true и сбрасывает ошибку', () => {
    // Экшен pending, без payload
    const action = { type: registerUser.pending.type };
    // Начальное состояние с флагом isLoading=false и ошибкой
    const initialState = {
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: 'Ошибка'
    };
    // Применяем экшен через редьюсер
    const state = authReducer(initialState, action);
    // Ожидаем, что включилась загрузка
    expect(state.isLoading).toBe(true);
    // Ошибка должна сброситься
    expect(state.error).toBeNull();
  });

  test('fulfilled: записывает токены и пользователя, отключает isLoading', () => {
    // Экшен с реальным payload
    const action = { type: registerUser.fulfilled.type, payload: mockResponse };
    // Предыдущее состояние с включённой загрузкой
    const initialState = {
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: true,
      error: null
    };
    // Обновляем состояние
    const state = authReducer(initialState, action);
    // Ожидаем, что пользователь записан
    expect(state.user).toEqual(mockResponse.user);
    // Токены тоже записаны
    expect(state.accessToken).toBe(mockResponse.accessToken);
    expect(state.refreshToken).toBe(mockResponse.refreshToken);
    // Загрузка отключена
    expect(state.isLoading).toBe(false);
  });

  test('rejected: записывает ошибку и отключает isLoading', () => {
    // Экшен rejected с ошибкой
    const action = {
      type: registerUser.rejected.type,
      payload: 'Ошибка'
    };
    // Предыдущее состояние
    const initialState = {
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: true,
      error: null
    };
    // Обновляем
    const state = authReducer(initialState, action);
    // Проверяем ошибку
    expect(state.error).toBe('Ошибка');
    // Загрузка должна завершиться
    expect(state.isLoading).toBe(false);
  });

  test('logout: очищает пользователя и токены', () => {
    // Состояние, в котором уже есть пользователь и токены
    const initialState = {
      user: mockResponse.user,
      accessToken: mockResponse.accessToken,
      refreshToken: mockResponse.refreshToken,
      isLoading: false,
      error: null
    };
    // Вызываем экшен logout
    const state = authReducer(initialState, logout());
    // Всё должно быть очищено
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
  });
});
