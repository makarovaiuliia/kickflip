import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addToCartApi, createCartApi, getActiveCartApi, updateCart } from '@/utils/kickflip-api';
import type { RootState } from './store';
import { AddItemToCartAction, CartResponse, LineItem, RemoveItemFromCartBody } from '@/types/types';

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

interface RemoveFromCartData {
    cartId: string;
    dataRequest: RemoveItemFromCartBody;
}

export const removeFromCart = createAsyncThunk('cart/removeItem', async (data: RemoveFromCartData) => {
    const response = await updateCart(data.cartId, data.dataRequest);
    return response;
});

interface InitialState {
    cartId: string;
    cartVersion: number;
    items: LineItem[];
    error: string | undefined;
}

const initialState: InitialState = {
    cartId: '',
    cartVersion: 0,
    items: [],
    error: undefined,
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
        clearErrorMessage: (state) => {
            state.error = undefined;
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
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(getActiveCart.fulfilled, (state, action) => {
                state.cartVersion = action.payload.version;
                state.items = action.payload.lineItems;
                state.cartId = action.payload.id;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartVersion = action.payload!.version;
                state.items = action.payload!.lineItems;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const getCartId = (state: RootState) => state.cart.cartId;
export const getCartVersion = (state: RootState) => state.cart.cartVersion;
export const getCartItems = (state: RootState) => state.cart.items;
export const getCartError = (state: RootState) => state.cart.error;

export const { setCart, removeCart, clearErrorMessage } = cartSlice.actions;

export default cartSlice.reducer;

/* eslint-enable no-param-reassign */
