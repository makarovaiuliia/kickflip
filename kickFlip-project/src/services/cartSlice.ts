import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCartApi, createCartApi } from '@/utils/kickflip-api';
import type { RootState } from './store';
import { AddItemToCartAction } from '@/types/types';

/* eslint-disable no-param-reassign */

export const createCart = createAsyncThunk('cart/create', async (isAuth: boolean) => {
    const response = await createCartApi(isAuth);
    return response;
});

interface AddToCartData {
    isAuth: boolean;
    cartId: string;
    item: AddItemToCartAction;
    cartVersion: number;
}

export const addToCart = createAsyncThunk('cart/addItem', async (data: AddToCartData) => {
    const response = await addToCartApi(data.cartId, data.isAuth, data.item, data.cartVersion);
    return response;
});

interface InitialState {
    cartId: string;
    cartVersion: number;
}

const initialState: InitialState = {
    cartId: '',
    cartVersion: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCart.fulfilled, (state, action) => {
                state.cartId = action.payload.id;
                state.cartVersion = action.payload.version;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartVersion = action.payload.version;
            });
    },
});

export const getCardId = (state: RootState) => state.cart.cartId;
export const getCardVersion = (state: RootState) => state.cart.cartVersion;

export default cartSlice.reducer;

/* eslint-enable no-param-reassign */
