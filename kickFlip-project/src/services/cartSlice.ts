import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addToCartApi, createCartApi, getActiveCartApi } from '@/utils/kickflip-api';
import type { RootState } from './store';
import { AddItemToCartAction, CartResponse, LineItem } from '@/types/types';

/* eslint-disable no-param-reassign */

export const createCart = createAsyncThunk('cart/create', async (isAuth: boolean) => {
    const response = await createCartApi(isAuth);
    return response;
});

export const getActiveCart = createAsyncThunk('cart/getActive', async () => {
    const response = await getActiveCartApi();
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

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

/* eslint-enable no-param-reassign */
