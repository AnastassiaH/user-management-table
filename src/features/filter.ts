import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export type FilterKeys = "" | "name" | "userName" | "email" | "phone";

type FilterState = {
  name: string;
  userName: string;
  email: string;
  phone: string;
  active: FilterKeys;
};

const initialState: FilterState = {
  name: "",
  userName: "",
  email: "",
  phone: "",
  active: "",
};

export const filterSlice: Slice<FilterState> = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActive: (state, { payload }: PayloadAction<FilterKeys>) => {
      state.active = payload;
    },
    setName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },
    removeName: (state) => {
      state.name = "";
    },
    setUserName: (state, { payload }: PayloadAction<string>) => {
      state.userName = payload;
    },
    removeUserName: (state) => {
      state.userName = "";
    },
    setEmail: (state, { payload }: PayloadAction<string>) => {
      state.email = payload;
    },
    removeEmail: (state) => {
      state.email = "";
    },
    setPhone: (state, { payload }: PayloadAction<string>) => {
      state.phone = payload;
    },
    removePhone: (state) => {
      state.phone = "";
    },
  },
});

export default filterSlice.reducer;
