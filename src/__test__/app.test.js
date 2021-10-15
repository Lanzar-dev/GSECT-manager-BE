import supertest from 'supertest';
import app from '../server.js';

const request = supertest(app);

it('get route', async () => {
    const response = await request.get('/');
    expect(200);
    expect(response.body.message).toBe('Welcome to our GSECT-MAMAGER App.');
});

