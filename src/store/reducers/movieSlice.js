import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    loadMovie: (state, action) => {
      state.info = action.payload;
    },
    removeMovie: (state) => {
      state.info = null;
      // console.log('hii',state.info)
    },
  },
});

export const { loadMovie, removeMovie } = movieSlice.actions;

export default movieSlice.reducer;
