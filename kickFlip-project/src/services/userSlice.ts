import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAnonymousTokenApi, getUserByIDApi, loginUserApi, signUpUserApi } from '@/utils/kickflip-api';
import { setCookie } from '@/utils/cookie';
import type { RootState } from './store';
import getCustomerId from '@/utils/utils';
import { LogInData, SignUpDataForm, TUser } from '@/types/types';

/* eslint-disable no-param-reassign */

export const loginUser = createAsyncThunk('user/login', async (data: LogInData) => {
    const response = await loginUserApi(data);
    localStorage.setItem('refreshToken', response.refresh_token);
    setCookie('accessToken', response.access_token);
    return response;
});

export const getAnonymousToken = createAsyncThunk('user/anonymousToken', async () => {
    const response = await getAnonymousTokenApi();
    localStorage.setItem('refreshToken', response.refresh_token);
    setCookie('accessToken', response.access_token);
    return response;
});

export const getUserByID = createAsyncThunk('user/get', async (userID: string) => {
    const response = await getUserByIDApi(userID);
    return response;
});

export const signUpUser = createAsyncThunk('user/register', async (data: SignUpDataForm) => {
    const response = await signUpUserApi(data);
    return response;
});

interface InitialState {
    userID: string | undefined;
    user: TUser | undefined;
    isAuth: boolean;
    error: string | undefined;
    isAuthChecked: boolean;
}

const initialState: InitialState = {
    userID: undefined,
    user: undefined,
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
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuth = true;
                state.userID = getCustomerId(action.payload.scope);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(getUserByID.fulfilled, (state, action) => {
                state.user = action.payload!;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.user = action.payload!;
                state.isAuth = true;
            });
    },
});

export const getUserSelector = (state: RootState) => state.user;
export const isAuth = (state: RootState) => state.user.isAuth;

export default userSlice.reducer;

/* eslint-enable no-param-reassign */
