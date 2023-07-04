import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subCategory: '',
  city: '',
  selectedRange: 50000
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    reset: (state) => {
      state.subCategory = '',
        state.city = '',
        state.selectedRange = 50000
    },
    setSubCategory: (state, action) => {
      state.subCategory = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setSelectedRange: (state, action) => {
      state.selectedRange = action.payload;
    },
  },
});

export const reset = filterSlice.actions.reset;
export const setSubCategory = filterSlice.actions.setSubCategory;
export const setCity = filterSlice.actions.setCity;
export const setSelectedRange = filterSlice.actions.setSelectedRange;

export default filterSlice.reducer;
