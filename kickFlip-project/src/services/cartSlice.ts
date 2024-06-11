import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addToCartApi, createCartApi, getCartsApi } from '@/utils/kickflip-api';
import type { RootState } from './store';
import { AddItemToCartAction } from '@/types/types';

/* eslint-disable no-param-reassign */

export const createCart = createAsyncThunk('cart/create', async (isAuth: boolean) => {
    const response = await createCartApi(isAuth);
    return response;
});

export const getCarts = createAsyncThunk('carts/get', async () => {
    const response = await getCartsApi();
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
    reducers: {
        setCart(state, action: PayloadAction<{ cartId: string; cartVersion: number }>) {
            state.cartId = action.payload.cartId;
            state.cartVersion = action.payload.cartVersion;
        },
    },
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

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

/* eslint-enable no-param-reassign */
