import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        month: 1,
    },
    reducers: {
        changeDTM(state, action) {
            state.month = action.payload;
        },
    },
});

export const { changeDTM } = postSlice.actions;
export const postReducer = postSlice.reducer;
