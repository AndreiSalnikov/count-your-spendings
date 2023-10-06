import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import spendReducer from './slices/spendSlice';
import loadingSlice from "./slices/loadingSlice";
import dateReducer from "./slices/dateReducer";

export const store = configureStore({
    reducer: {
        loading: loadingSlice,
        user: userReducer,
        date: dateReducer,
        spend: spendReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
