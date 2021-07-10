import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { app } from '../app';

declare global {
	namespace NodeJS {
		interface Global {
			signin(): string[];
		}
	}
}
let mongo: any;
beforeAll(async () => {
	process.env.JWT_KEY = 'asdf';
	mongo = new MongoMemoryServer();
	const mongoUri = await mongo.getUri();
	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (const collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

global.signin = () => {
	const payload = {
		id: 'f13faf2fsaf',
		email: 'test@test.test',
	};

	const token = jwt.sign(payload, process.env.JWT_KEY!);

	const session = { jwt: token };

	const sessionJSON = JSON.stringify(session);

	const base64session = Buffer.from(sessionJSON).toString('base64');

	return [`express:sess=${base64session}`];
};
