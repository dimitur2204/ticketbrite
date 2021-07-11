import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const init = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}

	if (!process.env.MONGO_URI) {
		throw new Error('MONGO_URI must be defined');
	}

	try {
		await natsWrapper.connect('ticketbrite', uuidv4(), 'http://nats-srv:4222');
		natsWrapper.client.on('close', () => {
			console.log('NATS connection closed!');
			process.exit();
		});
		process.on('SIGINT', () => natsWrapper.client.close());
		process.on('SIGTERM', () => natsWrapper.client.close());
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('Connected to db');
	} catch (error) {
		console.error(error);
	}
	app.listen(3000, () => {
		console.log('Listening on port 3000!');
	});
};

init();
