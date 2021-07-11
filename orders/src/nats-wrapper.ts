import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
	private _client?: Stan;

	get client() {
		if (!this._client) {
			throw new Error('Cannot access NATS client before connecting');
		}
		return this._client;
	}

	connect(clusterId: string, clientId: string, url: string): Promise<void> {
		console.log(clusterId);
		console.log(clientId);
		console.log(url);
		this._client = nats.connect(clusterId, clientId, { url });
		return new Promise((res, rej) => {
			this.client.on('connect', () => {
				res();
			});
			this.client.on('error', (err) => {
				rej(err);
			});
		});
	}
}

export const natsWrapper = new NatsWrapper();