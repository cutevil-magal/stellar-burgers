import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserApi, logoutApi } from '../../utils/burger-api';
import { TUser } from '@utils-types';
import { deleteCookie } from '../../utils/cookie';

const initialState: { user: TUser | null } = {
  user: null
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

// Выход пользователя
export const logoutUser = createAsyncThunk<void, void>(
  'user/logout',
  async (_, { dispatch }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
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
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload ?? null;
    });
  }
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
