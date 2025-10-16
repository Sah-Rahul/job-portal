import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setLoading, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
