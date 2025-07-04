import { expect, test, describe } from '@jest/globals';
import ingredientReducer, {
  selectIngredient,
  clearIngredient
} from './ingredientSlice';
import { TIngredient } from '@utils-types';

// Моковые данные
const mockIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

describe('Проверка редьюсера [ingredientReducer]', () => {
  test('selectIngredient: устанавливает выбранный ингредиент', () => {
    // Начальное состояние без выбранного ингредиента
    const initialState = { selectedIngredient: null };
    // Выполняем экшен выбора ингредиента   
    const newState = ingredientReducer(initialState, selectIngredient(mockIngredient));
    // Ожидаем, что выбранный ингредиент сохранится в состоянии
    expect(newState.selectedIngredient).toEqual(mockIngredient);
  });

  test('clearIngredient: сбрасывает выбранный ингредиент', () => {
    // Состояние, где ингредиент уже выбран
    const initialState = { selectedIngredient: mockIngredient };
    // Выполняем экшен очистки выбранного ингредиента
    const newState = ingredientReducer(initialState, clearIngredient());
    // Ожидаем, что выбранный ингредиент сбросится
    expect(newState.selectedIngredient).toBeNull();
  });
});
