import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type IngredientState = {
  selectedIngredient: TIngredient | null;
};

const initialState: IngredientState = {
  selectedIngredient: null
};

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    selectIngredient(state, action: PayloadAction<TIngredient>) {
      state.selectedIngredient = action.payload;
    },
    clearIngredient(state) {
      state.selectedIngredient = null;
    }
  }
});

export const { selectIngredient, clearIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;
