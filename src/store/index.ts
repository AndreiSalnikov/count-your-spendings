import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import spendReducer from './slices/spendSlice';
import loadingSlice from "./slices/loadingSlice";
import dateReducer from "./slices/dateReducer";
import incomeReducer from "./slices/incomeSlice"

export const store = configureStore({
    reducer: {
        loading: loadingSlice,
        user: userReducer,
        date: dateReducer,
        spend: spendReducer,
        income: incomeReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
