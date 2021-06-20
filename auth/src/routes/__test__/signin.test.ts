import request from 'supertest';
import { app } from '../../app';

describe('signin route', () => {
	it('returns a 200 on successful signin', async () => {
		await request(app)
			.post('/api/users/signup')
			.send({ email: 'test@test.com', password: 'password' })
			.expect(201);

		await request(app)
			.post('/api/users/signin')
			.send({ email: 'test@test.com', password: 'password' })
			.expect(200);
	});

	it('returns a 400 on wrong password', async () => {
		await request(app)
			.post('/api/users/signup')
			.send({ email: 'test@test.com', password: 'password' })
			.expect(201);

		return request(app)
			.post('/api/users/signin')
			.send({ email: 'test@test.com', password: 'definitelyWrong' })
			.expect(400);
	});

	it('returns a 400 on unexistent email', async () => {
		await request(app)
			.post('/api/users/signup')
			.send({ email: 'test@test.com', password: 'password' })
			.expect(201);

		return request(app)
			.post('/api/users/signin')
			.send({ email: 'definitely@wrong.com', password: 'password' })
			.expect(400);
	});

	it('returns a 400 on invalid email', async () => {
		return request(app)
			.post('/api/users/signin')
			.send({ email: 'testtest.com', password: 'password' })
			.expect(400);
	});

	it('returns a 400 on invalid password', async () => {
		return request(app)
			.post('/api/users/signin')
			.send({ email: 'test@test.com', password: '' })
			.expect(400);
	});

	it('sets a cookie after successful signin', async () => {
		await request(app)
			.post('/api/users/signup')
			.send({ email: 'test@test.com', password: 'password' })
			.expect(201);
		const res = await request(app)
			.post('/api/users/signin')
			.send({ email: 'test@test.com', password: 'password' })
			.expect(200);
		expect(res.get('Set-Cookie')).toBeDefined();
	});
});
