import { createSlice } from '@reduxjs/toolkit';

const persisted = (() => {
  try {
    return JSON.parse(localStorage.getItem('noirthread_wishlist') || '[]');
  } catch {
    return [];
  }
})();

const persist = (items) => localStorage.setItem('noirthread_wishlist', JSON.stringify(items));

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: persisted },
  reducers: {
    toggleWishlistItem: (state, action) => {
      const exists = state.items.some((item) => item._id === action.payload._id);
      state.items = exists
        ? state.items.filter((item) => item._id !== action.payload._id)
        : [action.payload, ...state.items];
      persist(state.items);
    },
    removeWishlistItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      persist(state.items);
    }
  }
});

export const { toggleWishlistItem, removeWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
