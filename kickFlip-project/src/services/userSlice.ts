import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getAnonymousTokenApi,
    getUserApi,
    loginUserApi,
    signUpUserApi,
    updateUserPasswordApi,
    updateUserProfileDataApi,
    updateUserAddressApi,
} from '@/utils/kickflip-api';
import type { RootState } from './store';
import { saveTokens } from '@/utils/utils';
import {
    LogInData,
    SignUpDataForm,
    StateMessage,
    TUser,
    UpdatePasswordForm,
    UpdateUserProfileDataFormRequest,
    UpdateUserAddressFormRequest,
} from '@/types/types';

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

export const getUser = createAsyncThunk('user/getUser', async () => {
    const response = await getUserApi();
    return response;
});

export const signUpUser = createAsyncThunk('user/register', async (data: SignUpDataForm) => {
    const response = await signUpUserApi(data);
    return response;
});

export const updateUserPassword = createAsyncThunk('user/updatePasword', async (data: UpdatePasswordForm) => {
    const response = await updateUserPasswordApi(data);
    return response;
});

export const updateUserProfileData = createAsyncThunk(
    'user/updateProfileData',
    async (data: UpdateUserProfileDataFormRequest) => {
        const response = await updateUserProfileDataApi(data);
        return response;
    }
);

export const updateUserAddress = createAsyncThunk(
    'user/updateProfileAddress',
    async (data: UpdateUserAddressFormRequest) => {
        const response = await updateUserAddressApi(data);
        return response;
    }
);

interface InitialState {
    user: TUser | undefined;
    isAuth: boolean;
    error: string | undefined;
    isAuthChecked: boolean;
    registrationMessage: string | undefined;
    updateUserMessage: string | undefined;
}

const initialState: InitialState = {
    user: undefined,
    isAuth: false,
    error: undefined,
    isAuthChecked: false,
    registrationMessage: undefined,
    updateUserMessage: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authChecked: (state) => {
            state.isAuthChecked = true;
        },
        logoutUser: (state) => {
            state.user = undefined;
            state.isAuth = false;
        },
        clearRegistrationMessage: (state) => {
            state.registrationMessage = undefined;
        },
        clearUpdateUserMessage: (state) => {
            state.updateUserMessage = undefined;
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
                state.user = action.payload.customer;
                state.isAuth = true;
                state.isAuthChecked = true;
                state.registrationMessage = StateMessage.Registered;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateUserPassword.fulfilled, (state, action) => {
                state.user = action.payload!;
                state.isAuth = true;
                state.isAuthChecked = true;
                state.updateUserMessage = StateMessage.UpdatedProfilePassword;
            })
            .addCase(updateUserPassword.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateUserProfileData.fulfilled, (state, action) => {
                state.user = action.payload!;
                state.isAuth = true;
                state.isAuthChecked = true;
                state.updateUserMessage = StateMessage.UpdatedProfileData;
            })
            .addCase(updateUserProfileData.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateUserAddress.fulfilled, (state, action) => {
                state.user = action.payload!;
                state.isAuth = true;
                state.isAuthChecked = true;
                state.updateUserMessage = StateMessage.UpdatedProfileAddress;
            })
            .addCase(updateUserAddress.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const getUserSelector = (state: RootState) => state.user;
export const getIsAuth = (state: RootState) => state.user.isAuth;

export const { logoutUser } = userSlice.actions;
export const { clearRegistrationMessage } = userSlice.actions;
export const { clearUpdateUserMessage } = userSlice.actions;

export default userSlice.reducer;

/* eslint-enable no-param-reassign */
