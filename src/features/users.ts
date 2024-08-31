import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { User } from "../types/User";
import { getUsers } from "../api";

type UserState = {
  users: User[];
  isUsersLoading: boolean;
  usersError: string;
};

const initialState: UserState = {
  users: [],
  isUsersLoading: false,
  usersError: "",
};

export const init = createAsyncThunk("users/fetch", () => {
  return getUsers();
});

export const userSlice: Slice<UserState> = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.isUsersLoading = true;
    });
    builder.addCase(init.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.isUsersLoading = false;
      state.users = action.payload;
    });
    builder.addCase(init.rejected, (state) => {
      state.isUsersLoading = false;
      state.usersError = "Something went wrong";
    });
  },
});

export default userSlice.reducer;
