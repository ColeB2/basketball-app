import { setupServer } from 'msw/node';
import { restHandlers } from './handlers';

// Setup requests interception using the given handlers.
export const server = setupServer(...restHandlers);
