import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCartApi } from '@/utils/kickflip-api';
import type { RootState } from './store';

/* eslint-disable no-param-reassign */

export const createCart = createAsyncThunk('cart/create', async () => {
    const response = await createCartApi();
    return response;
});

interface InitialState {
    cartId: string;
}

const initialState: InitialState = {
    cartId: '',
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCart.fulfilled, (state, action) => {
            state.cartId = action.payload.id;
        });
    },
});

export const getCardId = (state: RootState) => state.cart.cartId;

export default cartSlice.reducer;

/* eslint-enable no-param-reassign */
