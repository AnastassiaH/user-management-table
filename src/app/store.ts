import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users";
import filterReducer from "../features/filter";

export const store = configureStore({
  reducer: {
    users: userReducer,
    filter: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
