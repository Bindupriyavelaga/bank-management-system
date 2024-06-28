// tests/account.test.js
const request = require('supertest');
const app = require('../server');

describe('Account API', () => {
  it('should create an account', async () => {
    const res = await request(app)
      .post('/api/accounts/create')
      .send({ name: 'Test User', balance: 100 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'Test User');
    expect(res.body).toHaveProperty('balance', 100);
  });

  it('should deposit money into account', async () => {
    const createRes = await request(app)
      .post('/api/accounts/create')
      .send({ name: 'Test User', balance: 100 });
    const res = await request(app)
      .post('/api/accounts/deposit')
      .send({ id: createRes.body.id, amount: 50 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.balance).toEqual(150);
  });

  it('should withdraw money from account', async () => {
    const createRes = await request(app)
      .post('/api/accounts/create')
      .send({ name: 'Test User', balance: 100 });
    const res = await request(app)
      .post('/api/accounts/withdraw')
      .send({ id: createRes.body.id, amount: 50 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.balance).toEqual(50);
  });

  it('should get account details', async () => {
    const createRes = await request(app)
      .post('/api/accounts/create')
      .send({ name: 'Test User', balance: 100 });
    const res = await request(app).get(`/api/accounts/${createRes.body.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Test User');
    expect(res.body).toHaveProperty('balance', 100);
  });
});
