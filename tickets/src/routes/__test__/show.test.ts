import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

describe('get tickets router', () => {
	it('returns a 404 if the ticket is not found', async () => {
		await request(app).get('/api/tickets/reallyFakeId').send().expect(404);
	});

	it('returns the ticket if it is found', async () => {
		const response = await request(app)
			.post('/api/tickets')
			.set('Cookie', global.signin())
			.send({
				title: 'Test title',
				price: 10,
			})
			.expect(201);
		const ticketResponse = await request(app)
			.get(`/api/tickets/${response.body.id}`)
			.send()
			.expect(200);
		expect(ticketResponse.body.title).toEqual('Test title');
		expect(ticketResponse.body.price).toEqual(10);
	});
});
