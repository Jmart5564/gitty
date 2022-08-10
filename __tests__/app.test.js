const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('example test - delete me!', () => {
    expect(1).toEqual(1);
  });
  
  it('should login and redirect users to /api/v1/github/dashboard', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'fake_github_user',
      email: 'not-real@example.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
