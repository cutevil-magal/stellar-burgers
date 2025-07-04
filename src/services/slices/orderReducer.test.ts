import { expect, test, describe } from '@jest/globals';
import orderReducer, {
  clearOrder,
  sendOrder
} from './orderSlice';
import { TOrder } from '@utils-types';

// Мок данные
const mockOrder: TOrder = {
  _id: '686679a05a54df001b6db7c6',
  ingredients: ['abc', 'def'],
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2025-07-03T12:37:52.708Z',
  updatedAt: '2025-07-03T12:37:53.467Z',
  number: 83435
};

describe('Проверка редьюсера [orderReducer]', () => {
  test('sendOrder.pending: устанавливает загрузку, сбрасывает ошибку', () => {
    // Имитируется момент начала запроса: экшен pending
    const action = { type: sendOrder.pending.type };
    const initialState = {
      orderData: null,
      isLoading: false,
      error: 'Ошибка'
    };
    const state = orderReducer(initialState, action);
    // isLoading должен стать true, а сообщение об ошибке — исчезнуть
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('sendOrder.fulfilled: сохраняет данные заказа, отключает isLoading', () => {
    // Проверяется поведение при успешной отправке заказа
    const action = { type: sendOrder.fulfilled.type, payload: mockOrder };
    const initialState = {
      orderData: null,
      isLoading: true,
      error: null
    };
    const state = orderReducer(initialState, action);
    // Данные заказа (orderData) записываются, isLoading выключается
    expect(state.orderData).toEqual(mockOrder);
    expect(state.isLoading).toBe(false);
  });

  test('sendOrder.rejected: записывает ошибку, отключает isLoading', () => {
    // При ошибке оформления заказ не сохраняется.
    const action = {
      type: sendOrder.rejected.type,
      payload: 'Ошибка'
    };
    const initialState = {
      orderData: null,
      isLoading: true,
      error: null
    };
    const state = orderReducer(initialState, action);
    // isLoading выключается, а сообщение об ошибке попадает в state.error
    expect(state.error).toBe('Ошибка');
    expect(state.isLoading).toBe(false);
  });

  test('clearOrder: очищает данные заказа и ошибку', () => {
    // экшен сбрасывает orderData и error, например после закрытия модального окна.
    const initialState = {
      orderData: mockOrder,
      isLoading: false,
      error: 'Ошибка'
    };
    const state = orderReducer(initialState, clearOrder());
    // Позволяет очистить состояние после предыдущего заказа и подготовиться к новому
    expect(state.orderData).toBeNull();
    expect(state.error).toBeNull();
  });
});
