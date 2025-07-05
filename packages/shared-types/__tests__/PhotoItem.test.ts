import { describe, it, expect } from 'vitest';
import type { PhotoItem } from '../src/types/PhotoItem';

describe('PhotoItem', () => {
  it('should create a valid photo item with all fields', () => {
    const photoItem: PhotoItem = {
      id: '1',
      width: 1920,
      height: 1080,
      url: 'https://example.com/photo.jpg',
      photographer: 'John Doe',
      photographer_url: 'https://example.com/photographer',
      photographer_id: 123,
      avg_color: '#ff0000',
      src: {
        original: 'https://example.com/photo-original.jpg',
        large2x: 'https://example.com/photo-large2x.jpg',
        large: 'https://example.com/photo-large.jpg',
        medium: 'https://example.com/photo-medium.jpg',
        small: 'https://example.com/photo-small.jpg',
        portrait: 'https://example.com/photo-portrait.jpg',
        landscape: 'https://example.com/photo-landscape.jpg',
        tiny: 'https://example.com/photo-tiny.jpg',
      },
      liked: false,
      alt: 'A beautiful landscape photo',
    };

    expect(photoItem.id).toBe('1');
    expect(photoItem.width).toBe(1920);
    expect(photoItem.height).toBe(1080);
    expect(photoItem.url).toBe('https://example.com/photo.jpg');
    expect(photoItem.photographer).toBe('John Doe');
    expect(photoItem.photographer_url).toBe('https://example.com/photographer');
    expect(photoItem.photographer_id).toBe(123);
    expect(photoItem.avg_color).toBe('#ff0000');
    expect(photoItem.liked).toBe(false);
    expect(photoItem.alt).toBe('A beautiful landscape photo');
  });

  it('should have valid src object structure', () => {
    const photoItem: PhotoItem = {
      id: '2',
      width: 800,
      height: 600,
      url: 'https://example.com/photo2.jpg',
      photographer: 'Jane Smith',
      photographer_url: 'https://example.com/jane',
      photographer_id: 456,
      avg_color: '#00ff00',
      src: {
        original: 'https://example.com/photo2-original.jpg',
        large2x: 'https://example.com/photo2-large2x.jpg',
        large: 'https://example.com/photo2-large.jpg',
        medium: 'https://example.com/photo2-medium.jpg',
        small: 'https://example.com/photo2-small.jpg',
        portrait: 'https://example.com/photo2-portrait.jpg',
        landscape: 'https://example.com/photo2-landscape.jpg',
        tiny: 'https://example.com/photo2-tiny.jpg',
      },
      liked: true,
      alt: 'A portrait photo',
    };

    expect(photoItem.src.original).toBe('https://example.com/photo2-original.jpg');
    expect(photoItem.src.large2x).toBe('https://example.com/photo2-large2x.jpg');
    expect(photoItem.src.large).toBe('https://example.com/photo2-large.jpg');
    expect(photoItem.src.medium).toBe('https://example.com/photo2-medium.jpg');
    expect(photoItem.src.small).toBe('https://example.com/photo2-small.jpg');
    expect(photoItem.src.portrait).toBe('https://example.com/photo2-portrait.jpg');
    expect(photoItem.src.landscape).toBe('https://example.com/photo2-landscape.jpg');
    expect(photoItem.src.tiny).toBe('https://example.com/photo2-tiny.jpg');
  });

  it('should validate photo item structure with type guard', () => {
    function isPhotoItem(obj: unknown): obj is PhotoItem {
      return (
        typeof obj === 'object' &&
        obj !== null &&
        'id' in obj &&
        'width' in obj &&
        'height' in obj &&
        'url' in obj &&
        'photographer' in obj &&
        'photographer_url' in obj &&
        'photographer_id' in obj &&
        'avg_color' in obj &&
        'src' in obj &&
        'liked' in obj &&
        'alt' in obj &&
        typeof (obj as any).id === 'string' &&
        typeof (obj as any).width === 'number' &&
        typeof (obj as any).height === 'number' &&
        typeof (obj as any).url === 'string' &&
        typeof (obj as any).photographer === 'string' &&
        typeof (obj as any).photographer_url === 'string' &&
        typeof (obj as any).photographer_id === 'number' &&
        typeof (obj as any).avg_color === 'string' &&
        typeof (obj as any).src === 'object' &&
        typeof (obj as any).liked === 'boolean' &&
        typeof (obj as any).alt === 'string'
      );
    }

    const validPhotoItem = {
      id: '3',
      width: 1200,
      height: 800,
      url: 'https://example.com/photo3.jpg',
      photographer: 'Bob Wilson',
      photographer_url: 'https://example.com/bob',
      photographer_id: 789,
      avg_color: '#0000ff',
      src: {
        original: 'https://example.com/photo3-original.jpg',
        large2x: 'https://example.com/photo3-large2x.jpg',
        large: 'https://example.com/photo3-large.jpg',
        medium: 'https://example.com/photo3-medium.jpg',
        small: 'https://example.com/photo3-small.jpg',
        portrait: 'https://example.com/photo3-portrait.jpg',
        landscape: 'https://example.com/photo3-landscape.jpg',
        tiny: 'https://example.com/photo3-tiny.jpg',
      },
      liked: false,
      alt: 'A nature photo',
    };

    const invalidPhotoItem = {
      id: 123,
      width: 'invalid',
      height: 800,
    };

    expect(isPhotoItem(validPhotoItem)).toBe(true);
    expect(isPhotoItem(invalidPhotoItem)).toBe(false);
    expect(isPhotoItem(null)).toBe(false);
    expect(isPhotoItem(undefined)).toBe(false);
  });

  it('should handle different liked states', () => {
    const likedPhoto: PhotoItem = {
      id: '4',
      width: 1000,
      height: 750,
      url: 'https://example.com/photo4.jpg',
      photographer: 'Alice Green',
      photographer_url: 'https://example.com/alice',
      photographer_id: 999,
      avg_color: '#ffff00',
      src: {
        original: 'https://example.com/photo4-original.jpg',
        large2x: 'https://example.com/photo4-large2x.jpg',
        large: 'https://example.com/photo4-large.jpg',
        medium: 'https://example.com/photo4-medium.jpg',
        small: 'https://example.com/photo4-small.jpg',
        portrait: 'https://example.com/photo4-portrait.jpg',
        landscape: 'https://example.com/photo4-landscape.jpg',
        tiny: 'https://example.com/photo4-tiny.jpg',
      },
      liked: true,
      alt: 'A liked photo',
    };

    expect(likedPhoto.liked).toBe(true);
  });
});
