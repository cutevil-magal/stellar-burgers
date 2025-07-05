import { expect, test, describe } from '@jest/globals';
import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

// Моковые данные
const mockIngredients: TIngredient[] = [
  {
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  }
];

describe('Проверка редьюсера [ingredientsReducer]', () => {
  test('pending: должен установить isLoading в true и сбросить error', () => {
    const action = { type: fetchIngredients.pending.type };
    const initialState = { ingredients: [], isLoading: false, error: 'что-то было' };
    const state = ingredientsReducer(initialState, action);
    // После вызова экшена pending — загрузка началась (isLoading = true)
    expect(state.isLoading).toBe(true);
    // Сброс ошибки (error = null)
    expect(state.error).toBeNull();
  });

  test('fulfilled: должен загрузить ингредиенты и выключить isLoading', () => {
    const action = { type: fetchIngredients.fulfilled.type, payload: mockIngredients };
    const initialState = { ingredients: [], isLoading: true, error: null };
    const state = ingredientsReducer(initialState, action);
    // При успешной загрузке: данные попадают в ingredients
    expect(state.ingredients).toEqual(mockIngredients);
    // Загрузка завершена (isLoading = false)
    expect(state.isLoading).toBe(false);
  });

  test('rejected: должен записать ошибку и выключить isLoading', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка' }
    };
    const initialState = { ingredients: [], isLoading: true, error: null };
    const state = ingredientsReducer(initialState, action);
    // Загрузка останавливается (isLoading = false)
    expect(state.isLoading).toBe(false);
    // После ошибки: error записывается
    expect(state.error).toBe('Ошибка');
  });
});
