import { expect, test, describe } from '@jest/globals';
import userReducer, {
  logout,
  getUser,
  refreshAuthToken
} from './userSlice';
import { TUser } from '@utils-types';

// Мок пользователя
const mockUser: TUser = {
  email: 'anna.magal@gmail.com',
  name: 'AnnaCute'
};

describe('Проверка редьюсера [userReducer]', () => {
  test('getUser.pending: включает индикатор загрузки', () => {
    // Имитируется начало запроса (getUser.pending)
    const action = { type: getUser.pending.type };
    const initialState = {
      user: null,
      isLoading: false
    };
    const state = userReducer(initialState, action);
    // Проверяется, что isLoading включается, пользователь остаётся null
    expect(state.isLoading).toBe(true);
  });

  test('getUser.fulfilled: сохраняет данные пользователя, выключает загрузку', () => {
    // Экшен отработал успешно, payload содержит mockUser
    const action = { type: getUser.fulfilled.type, payload: mockUser };
    const initialState = {
      user: null,
      isLoading: true
    };
    const state = userReducer(initialState, action);
    // user записался, загрузка выключилась
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  test('getUser.rejected: выключает загрузку, не меняет пользователя', () => {
    const action = { type: getUser.rejected.type };
    const initialState = {
      user: mockUser,
      isLoading: true
    };
    const state = userReducer(initialState, action);
    // user не сбрасывается (если был раньше), isLoading выключается
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  test('refreshAuthToken.pending: включает загрузку', () => {
    // экшен, который обновляет accessToken, но в самом userSlice влияет только на isLoading
    const action = { type: refreshAuthToken.pending.type };
    const initialState = {
      user: mockUser,
      isLoading: false
    };
    const state = userReducer(initialState, action);
    // пользователь остаётся прежним
    expect(state.isLoading).toBe(true);
    expect(state.user).toEqual(mockUser); 
  });

  test('logout: сбрасывает данные пользователя', () => {
    const initialState = {
      user: mockUser,
      isLoading: false
    };
    const state = userReducer(initialState, logout());
    // user становится null, isLoading не меняется, остаётся как был
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
  });
});
