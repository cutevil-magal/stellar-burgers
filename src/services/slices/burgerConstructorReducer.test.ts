import { expect, test, describe } from '@jest/globals';
import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  updateIngredients
} from './burgerConstructorSlice';
import { TIngredient } from '@utils-types';

// Моковые тестовые ингредиенты
const main: TIngredient = {
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
};

const sauce: TIngredient = {
  _id: "643d69a5c3f7b9001cfa0945",
  name: "Соус с шипами Антарианского плоскоходца",
  type: "sauce",
  proteins: 101,
  fat: 99,
  carbohydrates: 100,
  calories: 100,
  price: 88,
  image: "https://code.s3.yandex.net/react/code/sauce-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
};

describe('Проверка редьюсера [burgerConstructorReducer]', () => {
  test('обработка экшена добавления ингредиента [addIngredient]', () => {
    const initialState = {
      bun: null,
      ingredients: [],
      ingredientCount: {}
    };
    // Применяем экшен addIngredient
    const newState = burgerConstructorReducer(initialState, addIngredient(main));
    // Проверяем, что ингредиент добавлен в массив
    expect(newState.ingredients).toEqual([main]);
    // Проверяем, что его счётчик равен 1
    expect(newState.ingredientCount[main._id]).toBe(1);
  });

  test('обработка экшена удаления ингредиента [removeIngredient]', () => {
    const initialState = {
      bun: null,
      ingredients: [main],
      ingredientCount: { [main._id]: 1 }
    };
    // Применяем экшен removeIngredient по индексу 0
    const newState = burgerConstructorReducer(initialState, removeIngredient(0));
    // Проверяем, что ингредиент удалён
    expect(newState.ingredients).toEqual([]);
    // Проверяем, что его счётчик исчез из ingredientCount
    expect(newState.ingredientCount[main._id]).toBeUndefined();
  });

  test('обработку экшена изменения порядка ингредиентов в начинке [updateIngredients]', () => {
    const initialState = {
      bun: null,
      ingredients: [main, sauce],
      ingredientCount: {
        [main._id]: 1,
        [sauce._id]: 1,
      }
    };
    // Новый порядок
    const reordered = [main, sauce];
    // Применяем updateIngredients
    const newState = burgerConstructorReducer(initialState, updateIngredients(reordered));
    // Проверяем, что порядок изменился (или остался, как задано)
    expect(newState.ingredients).toEqual(reordered);
  });
});
