import {configureStore} from "@reduxjs/toolkit";
import { rtkApi } from "./api/rtkApi";

export const store = configureStore({
    reducer: {
        [rtkApi.reducerPath] : rtkApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(rtkApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch