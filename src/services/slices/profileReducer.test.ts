import { expect, test, describe } from '@jest/globals';
import profileReducer, {
  resetProfile,
  updateUser,
  getOrders
} from './profileSlice';
import { TUser, TOrder } from '@utils-types';

// Мок пользователь
const mockUser: TUser = {
  email: 'anna.magal@gmail.com',
  name: 'AnnaCute'
};

// Мок заказ
const mockOrder: TOrder = {
  _id: '686679a05a54df001b6db7c6',
  ingredients: ['abc', 'def'],
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2025-07-03T12:37:52.708Z',
  updatedAt: '2025-07-03T12:37:53.467Z',
  number: 83435
};

describe('Проверка редьюсера [profileReducer]', () => {
  test('updateUser.fulfilled: сохраняет обновлённого пользователя', () => {
    // успешное завершение запроса на обновление пользователя (updateUser)
    const action = { type: updateUser.fulfilled.type, payload: mockUser };
    const initialState = {
      user: null,
      orders: []
    };
    const state = profileReducer(initialState, action);
    // новое значение user должно быть записано в state.
    expect(state.user).toEqual(mockUser);
  });

  test('getOrders.fulfilled: сохраняет массив заказов', () => {
    // успешная загрузка заказов пользователя (getOrders).
    const action = { type: getOrders.fulfilled.type, payload: [mockOrder] };
    const initialState = {
      user: mockUser,
      orders: []
    };
    const state = profileReducer(initialState, action);
    // все пришедшие заказы попадают в state.orders.
    expect(state.orders).toEqual([mockOrder]);
  });

  test('resetProfile: очищает пользователя и заказы', () => {
    // явный сброс состояния, вызываемый через resetProfile
    const initialState = {
      user: mockUser,
      orders: [mockOrder]
    };
    const state = profileReducer(initialState, resetProfile());
    // оба поля обнуляются
    expect(state.user).toBeNull();
    expect(state.orders).toEqual([]);
  });
});
