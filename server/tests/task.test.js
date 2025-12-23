import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';

describe('Task API', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should fail to create a task without a token', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task' });
    
    expect(res.statusCode).toEqual(401);
  });
});