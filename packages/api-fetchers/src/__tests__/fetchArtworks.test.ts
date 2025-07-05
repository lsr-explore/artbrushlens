import { describe, it, expect, beforeEach } from 'vitest';
import { fetchArtworks } from '../fetchArtworks';
import { mockArtworks } from '../../../../mocks/dist/data';

describe('fetchArtworks', () => {
  beforeEach(() => {
    // Reset any test state
  });

  it('should fetch artworks successfully', async () => {
    const result = await fetchArtworks('sunflowers');
    
    expect(result).toBeDefined();
    expect(result.artworks).toHaveLength(mockArtworks.length);
    expect(result.artworks[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      artist: expect.any(String)
    });
  });

  it('should handle empty search results', async () => {
    const result = await fetchArtworks('nonexistentquery');
    
    expect(result).toBeDefined();
    expect(Array.isArray(result.artworks)).toBe(true);
  });

  it('should throw error for invalid queries', async () => {
    await expect(fetchArtworks('')).rejects.toThrow();
  });

  it('should include all required artwork properties', async () => {
    const result = await fetchArtworks('test');
    
    if (result.artworks.length > 0) {
      const artwork = result.artworks[0];
      expect(artwork).toHaveProperty('id');
      expect(artwork).toHaveProperty('title');
      expect(artwork).toHaveProperty('artist');
    }
  });
});
