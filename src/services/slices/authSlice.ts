import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  TRegisterData,
  TAuthResponse,
  registerUserApi
} from '../../utils/burger-api';

type AuthState = {
  user: TAuthResponse['user'] | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null
};

// Асинхронная Thunk-функция для регистрации пользователя
export const registerUser = createAsyncThunk<
  TAuthResponse,
  TRegisterData,
  { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(data);
    document.cookie = `accessToken=${response.accessToken}; path=/; secure; samesite=Lax`;
    document.cookie = `refreshToken=${response.refreshToken}; path=/; secure; samesite=Lax`;
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка сервера');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка регистрации';
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
