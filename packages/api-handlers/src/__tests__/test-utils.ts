import { NextRequest } from 'next/server';
import { expect } from 'vitest';

export const createMockRequest = (
  method: string = 'GET',
  url: string = 'http://localhost:3000/api/test',
  body?: any,
  headers?: Record<string, string>
) => {
  const init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    init.body = JSON.stringify(body);
  }

  return new NextRequest(url, init);
};

export const extractJsonFromResponse = async (response: Response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const expectSuccessResponse = (response: Response) => {
  expect(response.status).toBeGreaterThanOrEqual(200);
  expect(response.status).toBeLessThan(300);
};

export const expectErrorResponse = (response: Response) => {
  expect(response.status).toBeGreaterThanOrEqual(400);
};
