import {configureStore} from "@reduxjs/toolkit";
import {reducers} from "@app/store/reducers.ts";

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;