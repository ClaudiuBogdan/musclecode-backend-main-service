import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  userId?: string;
  [key: string]: unknown;
}

// Export a singleton instance of AsyncLocalStorage to be used across the application
export const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();
