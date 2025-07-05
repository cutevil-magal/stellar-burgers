import { rootReducer } from './rootReducer';

import ingredientsReducer from './slices/ingredientsSlice';
import ingredientReducer from './slices/ingredientSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import authReducer from './slices/authSlice';
import loginReducer from './slices/loginSlice';
import feedReducer from './slices/feedSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import profileReducer from './slices/profileSlice';

describe('rootReducer', () => {
  it('Проверяtт правильную инициализацию [rootReducer]', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, unknownAction);

    // Каждая строка сравнивает:
    // Что вернул rootReducer в конкретной части (ingredients)
    // С тем, что возвращает конкретный редьюсер (ingredientsReducer) при инициализации

    expect(initialState.ingredients).toEqual(ingredientsReducer(undefined, unknownAction));
    expect(initialState.ingredient).toEqual(ingredientReducer(undefined, unknownAction));
    expect(initialState.burgerConstructor).toEqual(burgerConstructorReducer(undefined, unknownAction));
    expect(initialState.auth).toEqual(authReducer(undefined, unknownAction));
    expect(initialState.login).toEqual(loginReducer(undefined, unknownAction));
    expect(initialState.feed).toEqual(feedReducer(undefined, unknownAction));
    expect(initialState.order).toEqual(orderReducer(undefined, unknownAction));
    expect(initialState.user).toEqual(userReducer(undefined, unknownAction));
    expect(initialState.profile).toEqual(profileReducer(undefined, unknownAction));
  });
});
