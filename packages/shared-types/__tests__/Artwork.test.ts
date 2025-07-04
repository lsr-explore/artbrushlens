import { describe, it, expect } from 'vitest';
import type { Artwork } from '../src/types/Artwork';

describe('Artwork', () => {
  it('should create a valid artwork with required fields', () => {
    const artwork: Artwork = {
      id: '1',
      title: 'Mona Lisa',
    };

    expect(artwork.id).toBe('1');
    expect(artwork.title).toBe('Mona Lisa');
  });

  it('should create a valid artwork with all optional fields', () => {
    const artwork: Artwork = {
      id: '2',
      title: 'The Starry Night',
      artist: 'Vincent van Gogh',
      imageUrl: 'https://example.com/starry-night.jpg',
      description: 'A famous painting by Vincent van Gogh',
      metId: 'met-123',
      aiAnalysis: 'This painting shows swirling patterns in the sky',
    };

    expect(artwork.id).toBe('2');
    expect(artwork.title).toBe('The Starry Night');
    expect(artwork.artist).toBe('Vincent van Gogh');
    expect(artwork.imageUrl).toBe('https://example.com/starry-night.jpg');
    expect(artwork.description).toBe('A famous painting by Vincent van Gogh');
    expect(artwork.metId).toBe('met-123');
    expect(artwork.aiAnalysis).toBe('This painting shows swirling patterns in the sky');
  });

  it('should allow undefined optional fields', () => {
    const artwork: Artwork = {
      id: '3',
      title: 'Unknown Work',
      artist: undefined,
      imageUrl: undefined,
      description: undefined,
      metId: undefined,
      aiAnalysis: undefined,
    };

    expect(artwork.id).toBe('3');
    expect(artwork.title).toBe('Unknown Work');
    expect(artwork.artist).toBeUndefined();
    expect(artwork.imageUrl).toBeUndefined();
    expect(artwork.description).toBeUndefined();
    expect(artwork.metId).toBeUndefined();
    expect(artwork.aiAnalysis).toBeUndefined();
  });

  it('should validate artwork structure with type guard', () => {
    function isArtwork(obj: unknown): obj is Artwork {
      return (
        typeof obj === 'object' &&
        obj !== null &&
        'id' in obj &&
        'title' in obj &&
        typeof (obj as any).id === 'string' &&
        typeof (obj as any).title === 'string'
      );
    }

    const validArtwork = {
      id: '4',
      title: 'Test Artwork',
    };

    const invalidArtwork = {
      id: 123,
      title: 'Invalid',
    };

    expect(isArtwork(validArtwork)).toBe(true);
    expect(isArtwork(invalidArtwork)).toBe(false);
    expect(isArtwork(null)).toBe(false);
    expect(isArtwork(undefined)).toBe(false);
  });
});
