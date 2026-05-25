import { createSlice } from '@reduxjs/toolkit';

const persisted = (() => {
  try {
    return JSON.parse(localStorage.getItem('noirthread_guest_cart') || '[]');
  } catch {
    return [];
  }
})();

const persist = (items) => localStorage.setItem('noirthread_guest_cart', JSON.stringify(items));

const cartSlice = createSlice({
  name: 'cart',
  initialState: { guestItems: persisted, coupon: null },
  reducers: {
    addGuestItem: (state, action) => {
      const existing = state.guestItems.find((item) => item.sku === action.payload.sku);
      if (existing) existing.quantity += action.payload.quantity || 1;
      else state.guestItems.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      persist(state.guestItems);
    },
    updateGuestQuantity: (state, action) => {
      state.guestItems = state.guestItems
        .map((item) => item.sku === action.payload.sku ? { ...item, quantity: action.payload.quantity } : item)
        .filter((item) => item.quantity > 0);
      persist(state.guestItems);
    },
    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    clearGuestCart: (state) => {
      state.guestItems = [];
      persist([]);
    }
  }
});

export const { addGuestItem, updateGuestQuantity, setCoupon, clearGuestCart } = cartSlice.actions;
export default cartSlice.reducer;
