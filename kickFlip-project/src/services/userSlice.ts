import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TLoginData, loginUserApi } from '@/utils/kickflip-api';
import { setCookie } from '@/utils/cookie';
import { TUser } from '@/types/types';
import type { RootState } from './store';

/* eslint-disable no-param-reassign */
export const loginUser = createAsyncThunk('user/login', async (data: TLoginData) => {
    const response = await loginUserApi(data);
    localStorage.setItem('refreshToken', response.refresh_token);
    setCookie('accessToken', response.access_token);
    return response;
});

interface InitialState {
    user: TUser;
    isAuth: boolean;
    error: string | undefined;
    isAuthChecked: boolean;
}

const initialState: InitialState = {
    user: {
        email: '',
    },
    isAuth: false,
    error: undefined,
    isAuthChecked: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authChecked: (state) => {
            state.isAuthChecked = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state) => {
                state.isAuth = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to login';
            });
    },
});

export const getUserSelector = (state: RootState) => state.user.user;
export const isAuth = (state: RootState) => state.user.isAuth;

export default userSlice.reducer;
/* eslint-enable no-param-reassign */
