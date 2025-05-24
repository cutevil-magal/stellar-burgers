// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getUserApi, loginUserApi, registerUserApi, logoutApi } from '../../utils/burger-api';
// import { TUser, TLoginData, TRegisterData } from '@utils-types';

// type UserState = {
//   user: TUser | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;
// };

// const initialState: UserState = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: false,
//   error: null
// };

// // Асинхронные экшены для логина, регистрации и получения данных
// export const loginUser = createAsyncThunk(
//   'user/login',
//   async (data: TLoginData, { rejectWithValue }) => {
//     try {
//       const response = await loginUserApi(data);
//       return response.user;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   'user/register',
//   async (data: TRegisterData, { rejectWithValue }) => {
//     try {
//       const response = await registerUserApi(data);
//       return response.user;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const fetchUser = createAsyncThunk(
//   'user/fetchUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getUserApi();
//       return response.user;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'user/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       await logoutApi();
//       return null;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload;
//         state.isAuthenticated = true;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload;
//         state.isAuthenticated = true;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isAuthenticated = !!action.payload;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.isAuthenticated = false;
//       });
//   },
// });

// export default userSlice.reducer;
