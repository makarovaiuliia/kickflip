import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductProjected, TransformParams } from '@/types/types';
import { getCategoriesApi, getProductsFilteredApi } from '@/utils/kickflip-api';
import type { RootState } from './store';
import { transformCategoryData, CategoryData } from '@/utils/utils';

/* eslint-disable no-param-reassign */

export const getCategories = createAsyncThunk('categories/post', async () => {
    const response = await getCategoriesApi();
    return response;
});

export const getFilteredProducts = createAsyncThunk(
    'filtered/get',
    async ({ options, page }: { options: TransformParams; page: number }) => {
        const response = await getProductsFilteredApi(options, page);
        return response;
    }
);

interface InitialState {
    allSneakers: ProductProjected[];
    categories: CategoryData;
    total: number;
}

const initialState: InitialState = {
    allSneakers: [],
    categories: {},
    total: 0,
};

const sneakersSlice = createSlice({
    name: 'sneakers',
    initialState,
    reducers: {
        removeAllSneakers(state) {
            state.allSneakers = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = transformCategoryData(action.payload);
            })
            .addCase(getFilteredProducts.fulfilled, (state, action) => {
                state.allSneakers = [...state.allSneakers, ...action.payload.results];
                state.total = action.payload.total;
            });
    },
});

export const getAllSneakers = (state: RootState) => state.sneakers.allSneakers;
export const getAllCategories = (state: RootState) => state.sneakers.categories;
export const getTotal = (state: RootState) => state.sneakers.total;

export const { removeAllSneakers } = sneakersSlice.actions;

export default sneakersSlice.reducer;

/* eslint-enable no-param-reassign */
