import { http, HttpResponse } from 'msw';
import { 
  mockArtworks, 
  mockPhotoWorks, 
  mockDetectionResult, 
  mockAnalysisResult,
  mockErrorResponse 
} from './data';

export const handlers = [
  // Met Museum API
  http.get('https://collectionapi.metmuseum.org/public/collection/v1/search', () => {
    return HttpResponse.json({
      total: mockArtworks.length,
      objectIDs: mockArtworks.map(art => parseInt(art.id))
    });
  }),

  http.get('https://collectionapi.metmuseum.org/public/collection/v1/objects/:id', ({ params }) => {
    const artwork = mockArtworks.find(art => art.id === params.id);
    if (!artwork) {
      return HttpResponse.json(mockErrorResponse, { status: 404 });
    }
    return HttpResponse.json({
      objectID: artwork.id,
      title: artwork.title,
      artistDisplayName: artwork.artist,
      primaryImage: artwork.imageUrl,
      objectDate: artwork.year?.toString(),
      medium: artwork.medium,
      dimensions: artwork.dimensions,
      repository: artwork.location
    });
  }),

  // Pexels API
  http.get('https://api.pexels.com/v1/search', () => {
    return HttpResponse.json({
      photos: mockPhotoWorks.map(photo => ({
        id: photo.id,
        photographer: photo.photographer,
        src: { large: photo.url },
        alt: photo.description
      })),
      total_results: mockPhotoWorks.length,
      page: 1,
      per_page: 20
    });
  }),

  // OpenAI API
  http.post('https://api.openai.com/v1/chat/completions', () => {
    return HttpResponse.json({
      choices: [{
        message: {
          content: mockAnalysisResult.result
        }
      }]
    });
  }),

  // Hugging Face API
  http.post('https://api-inference.huggingface.co/models/:model', () => {
    return HttpResponse.json(mockDetectionResult.objects);
  }),

  // Local API routes
  http.post('/api/ai/analyze', () => {
    return HttpResponse.json(mockAnalysisResult);
  }),

  http.post('/api/ai/detect-objects', () => {
    return HttpResponse.json(mockDetectionResult);
  }),

  http.post('/api/critique', () => {
    return HttpResponse.json({
      critique: 'This is a thoughtful analysis of the artwork\'s composition and technique.'
    });
  }),

  http.get('/api/met/search', () => {
    return HttpResponse.json({ artworks: mockArtworks });
  }),

  http.get('/api/pexels/search', () => {
    return HttpResponse.json({ artworks: mockPhotoWorks });
  }),

  // Error scenarios
  http.get('/api/error-test', () => {
    return HttpResponse.json(mockErrorResponse, { status: 500 });
  })
];
