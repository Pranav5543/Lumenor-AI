import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { mobileMenuOpen: false, cursorVariant: 'default' },
  reducers: {
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    setCursorVariant: (state, action) => {
      state.cursorVariant = action.payload;
    }
  }
});

export const { setMobileMenuOpen, setCursorVariant } = uiSlice.actions;
export default uiSlice.reducer;
