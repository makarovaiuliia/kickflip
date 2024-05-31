import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductResponse } from '@/types/types';
import { getCategoriesApi, getProductsApi } from '@/utils/kickflip-api';
import type { RootState } from './store';
import { transformCategoryData, CategoryData } from '@/utils/utils';

/* eslint-disable no-param-reassign */

export const getProducts = createAsyncThunk('products/get', async () => {
    const response = await getProductsApi();
    return response;
});

export const getCategories = createAsyncThunk('categories/post', async () => {
    const response = await getCategoriesApi();
    return response;
});

interface InitialState {
    allSneakers: ProductResponse[];
    categories: CategoryData;
}

const initialState: InitialState = {
    allSneakers: [],
    categories: {},
};

const sneakersSlice = createSlice({
    name: 'sneakers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.allSneakers = action.payload.results;
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = transformCategoryData(action.payload);
        });
    },
});

export const getAllSneakers = (state: RootState) => state.sneakers.allSneakers;
export const getAllCategories = (state: RootState) => state.sneakers.categories;

export default sneakersSlice.reducer;

/* eslint-enable no-param-reassign */
