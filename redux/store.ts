import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import headerReducer from "./headerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    header: headerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
