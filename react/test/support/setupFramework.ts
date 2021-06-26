import '@testing-library/jest-dom';
import EventSource from 'eventsourcemock';
import { FetchMockSandbox, MockCall, MockRequest, MockResponse } from 'fetch-mock';
import fetchMockJest from 'fetch-mock-jest';
import 'jsdom-global/register';
import * as fetch from 'node-fetch';
import * as Config from '../../src/config/config';

//const useDocker = false;
const useFetchMock = true;
const allowUnmockedFetches = true;

if (!globalThis.runAllPromises) {
	globalThis.runAllPromises = () => new Promise(setImmediate);
}

if (!globalThis.EventSource) {
	globalThis.EventSource = EventSource;
}
function setUpFetchMock() {
	if (!useFetchMock) return;

	jest.mock('node-fetch', () => {
		return fetchMockJest.sandbox();
	});
	if (!globalThis.fetch) {
		(globalThis as any).fetch = fetch;
	}
	const fetchMock = fetch as unknown as jest.MockInstance<Response, MockCall> & FetchMockSandbox;
	if (!globalThis.fetchMock) {
		(globalThis as any).fetchMock = fetchMock;
	}

	fetchMock.config = {
		...fetchMock.config,
		fallbackToNetwork: true,
		warnOnFallback: false,
	};

	if (allowUnmockedFetches) return;
	fetchMock.catch((url: string, _opts: MockRequest): MockResponse => {
		console.error(`${url} not mocked`);
		return { status: 500 };
	});
}

setUpFetchMock();
beforeAll(async () => {
	await Config.Config.waitForInit();
});

//afterAll(async () => {}, 80000);
