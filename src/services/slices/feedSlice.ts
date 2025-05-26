import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrdersData, TOrder } from '@utils-types';

type FeedState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
  selectedOrder: TOrder | null;
  total: number;
  totalToday: number;
};

const initialState: FeedState = {
  orders: [],
  isLoading: false,
  error: null,
  selectedOrder: null,
  total: 0,
  totalToday: 0
};

// Thunk-функция для загрузки ленты заказов
export const getFeeds = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: string }
>('orders/all', async (_, { rejectWithValue }) => {
  try {
    const response = await getFeedsApi();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка загрузки заказов');
  }
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    refreshFeeds(state) {
      state.isLoading = true;
    },
    selectOrder(state, action: PayloadAction<TOrder>) {
      state.selectedOrder = action.payload;
    },
    closeOrder(state) {
      state.selectedOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total ?? 0;
        state.totalToday = action.payload.totalToday ?? 0;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка загрузки заказов';
      });
  }
});

export const { refreshFeeds, selectOrder, closeOrder } = feedSlice.actions;
export default feedSlice.reducer;
