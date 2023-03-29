// import { configureStore } from '@reduxjs/toolkit/dist/configureStore';
import { configureStore } from '@reduxjs/toolkit';
import { postReducer, changeDTM } from './slices/postSlice';

const store = configureStore({
    reducer: {
        post: postReducer,
    },
});

export { store, changeDTM };
