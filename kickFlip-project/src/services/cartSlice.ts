import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    customerId: string;
}

const initialState: InitialState = {
    customerId: '',
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
});

export default cartSlice.reducer;
