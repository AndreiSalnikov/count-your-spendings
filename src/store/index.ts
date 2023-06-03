import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import spendReducer from './slices/spendSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        spend: spendReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
