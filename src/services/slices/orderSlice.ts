import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

type OrderState = {
  orderData: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  orderData: null,
  isLoading: false,
  error: null
};

// Thunk-функция для отправки заказа
export const sendOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('order/sendOrder', async (ingredientIds, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка оформления заказа');
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.orderData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка оформления заказа';
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
