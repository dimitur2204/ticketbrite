import { Sequelize } from 'sequelize';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const init = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}

	if (!process.env.POSTGRES_URI) {
		throw new Error('POSTGRES_URI must be defined');
	}

	if (!process.env.POSTGRES_PASS) {
		throw new Error('POSTGRES_PASS must be defined');
	}
	if (!process.env.NATS_CLIENT_ID) {
		throw new Error('NATS_CLIENT_ID must be defined');
	}

	if (!process.env.NATS_CLUSTER_ID) {
		throw new Error('NATS_CLUSTER_ID must be defined');
	}

	if (!process.env.NATS_URL) {
		throw new Error('NATS_URL must be defined');
	}
	try {
		// await natsWrapper.connect(
		// 	process.env.NATS_CLUSTER_ID,
		// 	process.env.NATS_CLIENT_ID,
		// 	process.env.NATS_URL
		// );
		// natsWrapper.client.on('close', () => {
		// 	console.log('NATS connection closed!');
		// 	process.exit();
		// });
		// process.on('SIGINT', () => natsWrapper.client.close());
		// process.on('SIGTERM', () => natsWrapper.client.close());
		const sequelize = new Sequelize(
			`postgres://postgres:${process.env.POSTGRES_PASS}@${process.env.POSTGRES_URI}`
		);
		await sequelize.authenticate();
		console.log('Connected to db');
	} catch (error) {
		console.error(error);
	}
	app.listen(3000, () => {
		console.log('Listening on port 3000!');
	});
};

init();
