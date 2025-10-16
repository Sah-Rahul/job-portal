import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    alljob: [],
    loading: false,
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.alljob = action.payload;
    },
    setJobLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setAllJobs, setJobLoading } = jobSlice.actions;
export default jobSlice.reducer;
