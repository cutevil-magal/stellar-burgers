import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserApi, getOrdersApi } from '../../utils/burger-api';
import { TUser, TOrder } from '@utils-types';

type ProfileState = {
  user: TUser | null;
  orders: TOrder[];
};

const initialState: ProfileState = {
  user: null,
  orders: []
};

// Обновление данных пользователя
export const updateUser = createAsyncThunk<TUser, Partial<TUser>>(
  'profile/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData);
      return response.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка обновления данных'
      );
    }
  }
);

// Загрузка заказов пользователя
export const getOrders = createAsyncThunk<TOrder[], void>(
  'profile/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка загрузки заказов'
      );
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile(state) {
      state.user = null;
      state.orders = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload ?? [];
      });
  }
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
