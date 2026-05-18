import axios from 'axios';
import { isDev, retornaComAtraso } from '../api-defaults';

const EVENTS_BASE_URL = 'https://sales-notify-gkf4c2akhvgsagdt.canadacentral-01.azurewebsites.net';

const httpEventsApi = axios.create({
    baseURL: EVENTS_BASE_URL,
    timeout: 20000,
});

const mockEvents = [
    {
        event: 'ai.workflow.generation_succeeded',
        occurredAt: '2026-05-17T10:00:00.000Z',
        appVersion: '0.1.8',
        installId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        platform: 'linux',
        payload: { model: 'gpt-4o', provider: 'openai', durationMs: 3240, planType: 'free', quotaRemaining: 7 },
        savedAt: '2026-05-17T10:00:01.000Z',
    },
    {
        event: 'ai.workflow.generation_failed',
        occurredAt: '2026-05-17T09:30:00.000Z',
        appVersion: '0.1.7',
        installId: 'a1b2c3d4-1234-5678-abcd-ef0123456789',
        platform: 'win32',
        payload: { model: 'gpt-4o', provider: 'openai', errorCategory: 'timeout', planType: 'premium' },
        savedAt: '2026-05-17T09:30:01.000Z',
    },
    {
        event: 'ai.quota.exceeded',
        occurredAt: '2026-05-16T15:00:00.000Z',
        appVersion: '0.1.8',
        installId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        platform: 'darwin',
        payload: { planType: 'free', limit: 10, feature: 'generation' },
        savedAt: '2026-05-16T15:00:01.000Z',
    },
];

class EventsApiMock {
    get(_params) {
        return retornaComAtraso({ data: mockEvents, total: mockEvents.length, limit: 100, offset: 0, hasMore: false });
    }
}

class EventsApi {
    get(params) {
        return httpEventsApi.get('/v1/events', { params });
    }
}

export const eventsApi = isDev() ? new EventsApiMock() : new EventsApi();
