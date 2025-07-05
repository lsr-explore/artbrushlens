import { http, HttpResponse } from 'msw';
import { mockImageData } from './data';

export const handlers = [
  // Mock image analysis endpoint
  http.post('/api/analyze-image', () => {
    return HttpResponse.json(mockImageData);
  }),

  // Mock color palette endpoint
  http.get('/api/color-palette', () => {
    return HttpResponse.json(mockImageData.palette);
  })
];

import { setupServer } from 'msw/node';
export const server = setupServer(...handlers);
