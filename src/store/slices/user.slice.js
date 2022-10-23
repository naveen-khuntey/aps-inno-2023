import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: null,
  email: null,
  phone: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUserData(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
    resetUserData(state, action) {
      state.id = null;
      state.username = null;
      state.email = null;
      state.phone = null;
    },
  },
});

export const { storeUserData, resetUserData } = userSlice.actions;

export default userSlice.reducer;
