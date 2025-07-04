import { expect, test, describe } from '@jest/globals';
import feedReducer, {
  refreshFeeds,
  selectOrder,
  closeOrder,
  getFeeds
} from './feedSlice';
import { TOrder, TOrdersData } from '@utils-types';

// Мок заказ
const mockOrder: TOrder = {
  _id: '686679a05a54df001b6db7c6',
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2025-07-03T12:37:52.708Z',
  updatedAt: '2025-07-03T12:37:53.467Z',
  number: 83435
};

// Мок ответ API
const mockResponse: TOrdersData = {
  orders: [mockOrder],
  total: 83061,
  totalToday: 127
};

describe('Проверка редьюсера [feedReducer]', () => {
  test('refreshFeeds: включает индикатор загрузки', () => {
    // Начальное состояние до обновления
    const initialState = {
      orders: [],
      isLoading: false,
      error: null,
      selectedOrder: null,
      total: 0,
      totalToday: 0
    };
    // Применяем экшен refreshFeeds
    const state = feedReducer(initialState, refreshFeeds());
    // Ожидаем, что флаг isLoading стал true
    expect(state.isLoading).toBe(true);
  });

  test('selectOrder: устанавливает выбранный заказ', () => {
    const initialState = {
      orders: [],
      isLoading: false,
      error: null,
      selectedOrder: null,
      total: 0,
      totalToday: 0
    };
    // Применяем экшен с передачей заказа
    const state = feedReducer(initialState, selectOrder(mockOrder));
    // Ожидаем, что заказ записался в selectedOrder
    expect(state.selectedOrder).toEqual(mockOrder);
  });

  test('closeOrder: сбрасывает выбранный заказ', () => {
    const initialState = {
      orders: [],
      isLoading: false,
      error: null,
      selectedOrder: mockOrder,
      total: 0,
      totalToday: 0
    };
    // Применяем экшен сброса заказа
    const state = feedReducer(initialState, closeOrder());
    // Ожидаем, что selectedOrder стал null
    expect(state.selectedOrder).toBeNull();
  });

  test('getFeeds.pending: isLoading = true, error = null', () => {
    // Создаём pending-экшен
    const action = { type: getFeeds.pending.type };
    // Предыдущее состояние содержит старую ошибку
    const initialState = {
      orders: [],
      isLoading: false,
      error: 'Ошибка',
      selectedOrder: null,
      total: 0,
      totalToday: 0
    };
    // Применяем экшен
    const state = feedReducer(initialState, action);
    // Ожидаем, что isLoading включился, ошибка сброшена
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('getFeeds.fulfilled: записывает заказы и статистику', () => {
    // Экшен с полезными данными из payload
    const action = { type: getFeeds.fulfilled.type, payload: mockResponse };
    const initialState = {
      orders: [],
      isLoading: true,
      error: null,
      selectedOrder: null,
      total: 0,
      totalToday: 0
    };
    // Применяем экшен
    const state = feedReducer(initialState, action);
    // Проверяем, что пришедшие данные записались И isLoading отключился
    expect(state.orders).toEqual(mockResponse.orders);
    expect(state.total).toBe(mockResponse.total);
    expect(state.totalToday).toBe(mockResponse.totalToday);
    expect(state.isLoading).toBe(false);
  });

  test('getFeeds.rejected: записывает ошибку, выключает isLoading', () => {
    // Экшен с сообщением об ошибке
    const action = {
      type: getFeeds.rejected.type,
      payload: 'Ошибка'
    };
    const initialState = {
      orders: [],
      isLoading: true,
      error: null,
      selectedOrder: null,
      total: 0,
      totalToday: 0
    };
    // Применяем экшен
    const state = feedReducer(initialState, action);
    // Ожидаем, что ошибка записалась и загрузка отключилась
    expect(state.error).toBe('Ошибка');
    expect(state.isLoading).toBe(false);
  });
});
