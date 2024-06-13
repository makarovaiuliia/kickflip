import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addToCartApi, createCartApi, getActiveCartApi } from '@/utils/kickflip-api';
import type { RootState } from './store';
import { AddItemToCartAction, CartResponse, LineItem } from '@/types/types';

/* eslint-disable no-param-reassign */

export const createCart = createAsyncThunk('cart/create', async () => {
    const response = await createCartApi();
    return response;
});

export const getActiveCart = createAsyncThunk('cart/getActive', async () => {
    const response = await getActiveCartApi();
    return response;
});

interface AddToCartData {
    cartId: string;
    item: AddItemToCartAction;
    cartVersion: number;
}

export const addToCart = createAsyncThunk('cart/addItem', async (data: AddToCartData) => {
    const response = await addToCartApi(data.cartId, data.item, data.cartVersion);
    return response;
});

interface InitialState {
    cartId: string;
    cartVersion: number;
    items: LineItem[];
}

const initialState: InitialState = {
    cartId: '',
    cartVersion: 0,
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state, action: PayloadAction<CartResponse>) {
            state.cartId = action.payload.id;
            state.cartVersion = action.payload.version;
            state.items = action.payload.lineItems;
        },
        removeCart(state) {
            state.cartId = '';
            state.cartVersion = 0;
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCart.fulfilled, (state, action) => {
                state.cartId = action.payload.id;
                state.cartVersion = action.payload.version;
                state.items = action.payload.lineItems;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartVersion = action.payload.version;
                state.items = action.payload.lineItems;
            })
            .addCase(getActiveCart.fulfilled, (state, action) => {
                state.cartVersion = action.payload.version;
                state.items = action.payload.lineItems;
                state.cartId = action.payload.id;
            });
    },
});

export const getCartId = (state: RootState) => state.cart.cartId;
export const getCartVersion = (state: RootState) => state.cart.cartVersion;
export const getCartItems = (state: RootState) => state.cart.items;

export const { setCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;

/* eslint-enable no-param-reassign */
