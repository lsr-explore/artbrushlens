import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "../../mocks/server";

// Setup MSW
beforeAll(() => server.listen());
afterEach(() => {
	server.resetHandlers();
});
afterAll(() => server.close());

// Mock environment variables
process.env.NODE_ENV = "test";
process.env.USE_LOCAL_AI = "true";
