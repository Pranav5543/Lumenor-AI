import { describe, expect, it, jest } from '@jest/globals';

jest.unstable_mockModule('../models/Product.js', () => ({
  Product: {
    find: jest.fn(() => ({
      lean: jest.fn().mockResolvedValue([
        { _id: { toString: () => 'a' }, categories: ['Outerwear'], tags: ['wool'], stock: 10, trending: true, featured: false, purchaseCount: 2, wishlistCount: 5, viewCount: 30 },
        { _id: { toString: () => 'b' }, categories: ['Shoes'], tags: ['leather'], stock: 10, trending: false, featured: false, purchaseCount: 0, wishlistCount: 1, viewCount: 2 }
      ])
    }))
  }
}));

jest.unstable_mockModule('../models/Order.js', () => ({
  Order: {
    find: jest.fn(() => ({ lean: jest.fn().mockResolvedValue([]) }))
  }
}));

const { getRecommendationsForUser } = await import('../services/recommendation.service.js');

describe('recommendation service', () => {
  it('scores products from behavior and collaborative signals', async () => {
    const items = await getRecommendationsForUser({ wishlist: ['a'], recentlyViewed: [], _id: 'u1' });
    expect(items[0]._id.toString()).toBe('a');
    expect(items[0].recommendationScore).toBeGreaterThan(items[1].recommendationScore);
  });
});
