import matchers from '@testing-library/jest-dom/matchers';
import { expect, afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './mocks/server';

expect.extend(matchers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
