import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductResponse } from '@/types/types';
import { getProductsApi } from '@/utils/kickflip-api';
import type { RootState } from './store';

/* eslint-disable no-param-reassign */

export const getProducts = createAsyncThunk('products/get', async () => {
    const response = await getProductsApi();
    return response;
});

interface InitialState {
    allSneakers: ProductResponse[];
}

const initialState: InitialState = {
    allSneakers: [],
};

const sneakersSlice = createSlice({
    name: 'sneakers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.allSneakers = action.payload.results;
        });
    },
});

export const getAllSneakers = (state: RootState) => state.sneakers.allSneakers;

export default sneakersSlice.reducer;

/* eslint-enable no-param-reassign */
