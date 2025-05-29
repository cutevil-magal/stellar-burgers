import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  logoutApi,
  refreshToken,
  TRefreshResponse
} from '../../utils/burger-api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

const initialState: { user: TUser | null; isLoading: boolean } = {
  user: null,
  isLoading: false
};

// данные текущего пользователя
export const getUser = createAsyncThunk<TUser, void>(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка загрузки данных'
      );
    }
  }
);

export const refreshAuthToken = createAsyncThunk<TRefreshResponse, void>(
  'user/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshToken();
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка обновления токена');
    }
  }
);

// Выход пользователя
export const logoutUser = createAsyncThunk<void, void>(
  'user/logout',
  async (_, { dispatch }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(logout());
      window.location.href = '/login';
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshAuthToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload ?? null;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
