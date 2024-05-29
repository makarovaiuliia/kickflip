import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductProjected } from '@/types/types';
import { getCategoriesApi, getProductsFilteredApi } from '@/utils/kickflip-api';
import type { RootState } from './store';
import { transformCategoryData, CategoryData } from '@/utils/utils';

/* eslint-disable no-param-reassign */

// export const getProducts = createAsyncThunk('products/get', async () => {
//     const response = await getProductsApi();
//     return response;
// });

export const getCategories = createAsyncThunk('categories/post', async () => {
    const response = await getCategoriesApi();
    return response;
});

export const getFilteredProducts = createAsyncThunk('filtered/get', async () => {
    const response = await getProductsFilteredApi();
    return response;
});

interface InitialState {
    allSneakers: ProductProjected[];
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
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = transformCategoryData(action.payload);
            })
            .addCase(getFilteredProducts.fulfilled, (state, action) => {
                state.allSneakers = action.payload.results;
            });
    },
});

export const getAllSneakers = (state: RootState) => state.sneakers.allSneakers;
export const getAllCategories = (state: RootState) => state.sneakers.categories;

export default sneakersSlice.reducer;

/* eslint-enable no-param-reassign */
