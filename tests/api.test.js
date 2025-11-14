const request = require('supertest');
const app = require('../server');

describe('API', () => {
  test('GET /api/items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
  });
});
