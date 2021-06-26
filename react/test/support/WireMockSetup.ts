// import { WireMock } from 'wiremock-captain';
// import * as Dockerode from 'dockerode';
// import * as dockerodeCompose from 'dockerode-compose';
// import got from 'got';
// import { map } from 'lodash';
// import * as path from 'path';
// import { exit } from 'process';

// export interface DockerState {
// 	secrets: Record<string, unknown>[];
// 	volumes: Record<string, unknown>[];
// 	configs: Record<string, unknown>[];
// 	networks: Record<string, unknown>[];
// 	services: Record<string, unknown>[];
// }

// async function dockerSetup(): Promise<DockerState | undefined> {
// 	console.log(`Docker Starting`);
// 	try {
// 		const docker = new Dockerode();
// 		const compose = new dockerodeCompose(docker, path.join(__dirname, 'docker-compose.yml'), 'wiremock');
// 		return await compose.up();
// 	} catch (err) {
// 		console.error('something went wrong:', err.message);
// 	}
// 	console.log(`Docker Started`);
// }
// async function dockerCleanUp(state: DockerState | undefined) {
// 	if (!state) return;
// 	const docker = new Dockerode();
// 	try {
// 		const cnt = docker.getContainer(state.services[0].id as string);
// 		const netWorks = map((await cnt.inspect()).NetworkSettings.Networks, (value) => {
// 			return value;
// 		});
// 		const net = docker.getNetwork(netWorks[0].NetworkID);

// 		try {
// 			await cnt.stop({ t: 5 });
// 		} catch (err) {
// 			console.error(`Failed removing cnt ${cnt.id}:`, err.message);
// 		}
// 		try {
// 			await cnt.remove({ v: true, link: false, force: true });
// 		} catch (err) {
// 			console.error(`Failed removing cnt ${cnt.id}:`, err.message);
// 		}
// 		try {
// 			await net.remove();
// 		} catch (err) {
// 			console.error('something went wrong when removing network:', err.message);
// 		}
// 	} catch (err) {
// 		console.error('something went wrong:', err.message);
// 	}
// 	console.log(`docker clean up complete`);
// }

// async function main() {
// 	// const dockerState = await dockerSetup();
// 	// if (!dockerState) {
// 	// 	console.error(`Docker did not start correctly`);
// 	// 	exit(1);
// 	// };
// 	try {
// 		const wiremock = 'http://localhost:8088';
// 		const mock = new WireMock(wiremock);

// 		mock.clearAllMappings();
// 		mock.clearAll();

// 		console.log(`Starting record`);
// 		const { body: started } = await got.post(`${wiremock}/__admin/recordings/start`, {
// 			json: {
// 				targetBaseUrl: 'http://host.docker.internal:5000',
// 			},
// 			responseType: 'json',
// 		});
// 		try {
// 			console.dir(started);
// 			let i = 1;
// 			console.log(`get ${i++}`);
// 			await got(`${wiremock}/fire/api/site/`);
// 			console.log(`get ${i++}`);
// 			await got(`${wiremock}/fire/api/equipment/`);
// 			console.log(`get ${i++}`);

// 			console.log(`get ${i++}`);
// 			await got(`${wiremock}/fire/api/configuration/EQ_TYPE_RADIO/SPECTRA/COMSCAN/1/`);
// 			console.log(`get ${i++}`);

// 			try {
// 				await got(`${wiremock}/fire/api/equipment/1/`);
// 			} catch (e) {
// 				//expected to throw
// 			}
// 		} catch (e) {
// 			console.trace(e.stack);
// 		} finally {
// 			const { body: stopped } = await got.post(`${wiremock}/__admin/recordings/stop`, {
// 				responseType: 'json',
// 			});

// 			console.dir(stopped);
// 		}
// 	} finally {
// 		// dockerCleanUp(dockerState);
// 	}
// }

// main();
