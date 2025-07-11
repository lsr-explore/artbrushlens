import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "../../mocks/server";

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
	cleanup();
});

// Establish API mocking before all tests
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());

// Mock environment variables
process.env.NODE_ENV = "test";
process.env.USE_LOCAL_AI = "true";
