import type { Artwork } from '@artbrushlens/shared-types';

export const mockArtwork: Artwork = {
  id: '1',
  title: 'The Starry Night',
  artist: 'Vincent van Gogh',
  description: 'A famous painting depicting a swirling night sky',
  imageUrl: 'https://example.com/starry-night.jpg',
  year: 1889,
  medium: 'Oil on canvas',
  dimensions: '73.7 cm × 92.1 cm',
  location: 'Museum of Modern Art, New York',
  aiAnalysis: 'This masterpiece showcases Van Gogh\'s distinctive style with bold brushstrokes and vibrant colors.'
};

export const mockArtworks: Artwork[] = [
  mockArtwork,
  {
    id: '2',
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    description: 'A portrait painting of Lisa Gherardini',
    imageUrl: 'https://example.com/mona-lisa.jpg',
    year: 1503,
    medium: 'Oil on poplar',
    dimensions: '77 cm × 53 cm',
    location: 'Louvre Museum, Paris'
  },
  {
    id: '3',
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    description: 'A woodblock print depicting a large wave',
    imageUrl: 'https://example.com/great-wave.jpg',
    year: 1831,
    medium: 'Woodblock print',
    dimensions: '25.7 cm × 37.9 cm',
    location: 'Various collections'
  }
];

export const mockPhotoWork = {
  id: 'photo-1',
  title: 'City Street Photography',
  photographer: 'John Doe',
  url: 'https://example.com/city-street.jpg',
  description: 'A bustling city street scene',
  tags: ['city', 'street', 'urban']
};

export const mockPhotoWorks = [
  mockPhotoWork,
  {
    id: 'photo-2',
    title: 'Nature Landscape',
    photographer: 'Jane Smith',
    url: 'https://example.com/landscape.jpg',
    description: 'A serene mountain landscape',
    tags: ['nature', 'landscape', 'mountains']
  }
];

export const mockDetectionResult = {
  objects: [
    {
      label: 'person',
      score: 0.95,
      box: { xmin: 100, ymin: 50, xmax: 200, ymax: 300 }
    },
    {
      label: 'car',
      score: 0.87,
      box: { xmin: 300, ymin: 150, xmax: 500, ymax: 250 }
    }
  ]
};

export const mockAnalysisResult = {
  result: 'This artwork demonstrates exceptional use of color and composition, characteristic of the Post-Impressionist movement.'
};

export const mockErrorResponse = {
  error: 'Something went wrong',
  message: 'An unexpected error occurred'
};
