import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    loadPerson: (state, action) => {
      state.info = action.payload;
    },
    removePerson: (state) => {
      state.info = null;
    },
  },
});

export const { loadPerson, removePerson } = peopleSlice.actions;

export default peopleSlice.reducer;
