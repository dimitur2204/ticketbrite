import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';
describe('update tickets router', () => {
	it('returns 404 if ticket is not found', async () => {
		const response = await request(app)
			.put('/api/tickets/reallyFakeId')
			.set('Cookie', global.signin())
			.send({
				title: 'Test title',
				price: 10,
			});
		expect(response.status).toEqual(404);
	});

	it('can only be accessed if the user is authenticated', async () => {
		const ticketResponse = await request(app)
			.post('/api/tickets')
			.set('Cookie', global.signin())
			.send({
				title: 'Test title',
				price: 10,
			});

		const response = await request(app)
			.put(`/api/tickets/${ticketResponse.body.id}`)
			.send({});
		expect(response.status).toEqual(401);
	});
	it('returns a 400 if the user provides an invalid title or price', async () => {
		const cookie = global.signin();

		const ticketResponse = await request(app)
			.post('/api/tickets')
			.set('Cookie', cookie)
			.send({
				title: 'Test title',
				price: 10,
			});

		await request(app)
			.put(`/api/tickets/${ticketResponse.body.id}`)
			.set('Cookie', cookie)
			.send({
				title: '',
				price: 10,
			})
			.expect(400);

		await request(app)
			.put(`/api/tickets/${ticketResponse.body.id}`)
			.set('Cookie', cookie)
			.send({
				title: 'Test title',
				price: -10,
			})
			.expect(400);
	});
	it('updates the ticket if provided valid inputs', async () => {
		const cookie = global.signin();

		const ticketResponse = await request(app)
			.post('/api/tickets')
			.set('Cookie', cookie)
			.send({
				title: 'Test title',
				price: 10,
			});

		await request(app)
			.put(`/api/tickets/${ticketResponse.body.id}`)
			.set('Cookie', cookie)
			.send({
				title: 'New title',
				price: 100,
			})
			.expect(200);

		const getNewTicketResponse = await request(app)
			.get(`/api/tickets/${ticketResponse.body.id}`)
			.send();
		expect(getNewTicketResponse.body.title).toEqual('New title');
		expect(getNewTicketResponse.body.price).toEqual(100);
	});
	it('publishes an event', async () => {
		const cookie = global.signin();

		const ticketResponse = await request(app)
			.post('/api/tickets')
			.set('Cookie', cookie)
			.send({
				title: 'Test title',
				price: 10,
			});

		await request(app)
			.put(`/api/tickets/${ticketResponse.body.id}`)
			.set('Cookie', cookie)
			.send({
				title: 'New title',
				price: 100,
			})
			.expect(200);
		expect(natsWrapper.client.publish).toHaveBeenCalled();
	});
});
