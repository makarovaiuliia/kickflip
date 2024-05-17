import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAnonymousTokenApi, getUserApi, loginUserApi, signUpUserApi } from '@/utils/kickflip-api';
import type { RootState } from './store';
import { saveTokens } from '@/utils/utils';
import { LogInData, SignUpDataForm, TUser } from '@/types/types';

/* eslint-disable no-param-reassign */

export const loginUser = createAsyncThunk('user/login', async (data: LogInData) => {
    const response = await loginUserApi(data);
    saveTokens(response.access_token, response.refresh_token);
    return response;
});

export const getAnonymousToken = createAsyncThunk('user/anonymousToken', async () => {
    const response = await getAnonymousTokenApi();
    saveTokens(response.access_token, response.refresh_token);
    return response;
});

// export const getUserByID = createAsyncThunk('user/get', async (userID: string) => {
//     const response = await getUserByIDApi(userID);
//     return response;
// });

export const getUser = createAsyncThunk('user/getUser', async () => {
    const response = await getUserApi();
    return response;
});

export const signUpUser = createAsyncThunk('user/register', async (data: SignUpDataForm) => {
    const response = await signUpUserApi(data);
    return response;
});

interface InitialState {
    user: TUser | undefined;
    isAuth: boolean;
    error: string | undefined;
    isAuthChecked: boolean;
}

const initialState: InitialState = {
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
        logout: (state) => {
            state.user = undefined;
            state.isAuth = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state) => {
                state.isAuth = true;
                state.isAuthChecked = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload!;
                state.isAuth = true;
                state.isAuthChecked = true;
            })
            .addCase(getUser.rejected, (state) => {
                state.isAuthChecked = true;
            })
            .addCase(getAnonymousToken.fulfilled, (state) => {
                state.isAuth = false;
                state.isAuthChecked = true;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.user = action.payload!;
                state.isAuth = true;
                state.isAuthChecked = true;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const getUserSelector = (state: RootState) => state.user;
export const isAuth = (state: RootState) => state.user.isAuth;

export default userSlice.reducer;

/* eslint-enable no-param-reassign */
