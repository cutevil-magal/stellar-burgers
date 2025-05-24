import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type BurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
  ingredientCount: { [key: string]: number }; // Счётчик ингредиентов
};

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
  ingredientCount: {}
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      state.ingredients.push(action.payload);
      state.ingredientCount[action.payload._id] =
        (state.ingredientCount[action.payload._id] || 0) + 1;
    },
    removeIngredient(state, action: PayloadAction<number>) {
      const removedIngredient = state.ingredients[action.payload];
      state.ingredients.splice(action.payload, 1);
      if (
        removedIngredient &&
        state.ingredientCount[removedIngredient._id] > 1
      ) {
        state.ingredientCount[removedIngredient._id] -= 1;
      } else {
        delete state.ingredientCount[removedIngredient._id];
      }
    },
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
      state.ingredientCount = {};
    },
    updateIngredients(state, action: PayloadAction<TIngredient[]>) {
      state.ingredients = action.payload; // Обновляем порядок ингредиентов
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  setBun,
  clearConstructor,
  updateIngredients
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
