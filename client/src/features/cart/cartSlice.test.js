import { describe, expect, it } from 'vitest';
import reducer, { addGuestItem, updateGuestQuantity } from './cartSlice.js';

describe('cartSlice', () => {
  it('merges duplicate guest cart SKUs', () => {
    const state = reducer(undefined, addGuestItem({ sku: 'A', price: 10, quantity: 1 }));
    const next = reducer(state, addGuestItem({ sku: 'A', price: 10, quantity: 2 }));
    expect(next.guestItems[0].quantity).toBe(3);
  });

  it('removes items when quantity reaches zero', () => {
    const state = { guestItems: [{ sku: 'A', quantity: 1 }], coupon: null };
    const next = reducer(state, updateGuestQuantity({ sku: 'A', quantity: 0 }));
    expect(next.guestItems).toEqual([]);
  });
});
