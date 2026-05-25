import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import { createApp } from '../app.js';

describe('auth validation', () => {
  it('rejects weak registration payloads', async () => {
    const res = await request(createApp()).post('/api/auth/register').send({ email: 'bad', password: 'short' });
    expect(res.status).toBe(422);
  });
});
