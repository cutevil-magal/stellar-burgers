import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  TLoginData,
  TAuthResponse,
  loginUserApi
} from '../../utils/burger-api';

type LoginState = {
  user: TAuthResponse['user'] | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: LoginState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null
};

export const loginUser = createAsyncThunk<
  TAuthResponse,
  TLoginData,
  { rejectValue: string }
>('login/login', async (data, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(data);
    document.cookie = `accessToken=${response.accessToken}; path=/; secure; samesite=Lax`;
    document.cookie = `refreshToken=${response.refreshToken}; path=/; secure; samesite=Lax`;
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка входа');
  }
});

const loginSlice = createSlice({
  name: 'login',
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
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка входа';
      });
  }
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
