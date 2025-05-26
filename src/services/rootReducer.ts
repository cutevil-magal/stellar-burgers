import { combineReducers } from '@reduxjs/toolkit';

import ingredientsReducer from './slices/ingredientsSlice';
import ingredientReducer from './slices/ingredientSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import authReducer from './slices/authSlice';
import loginReducer from './slices/loginSlice';
import feedReducer from './slices/feedSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import profileReducer from './slices/profileSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  burgerConstructor: burgerConstructorReducer,
  auth: authReducer,
  login: loginReducer,
  feed: feedReducer,
  order: orderReducer,
  user: userReducer,
  profile: profileReducer
});
