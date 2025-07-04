import { describe, it, expect } from 'vitest';
import { fetchPhotoWorks } from '../fetchPhotoWorks';
import { mockPhotoWorks } from '../../../../mocks/dist/data';

describe('fetchPhotoWorks', () => {
  it('should fetch photo works successfully', async () => {
    const result = await fetchPhotoWorks('city street');
    
    expect(result).toBeDefined();
    expect(result.artworks).toHaveLength(mockPhotoWorks.length);
    expect(result.artworks[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      photographer: expect.any(String),
      url: expect.any(String)
    });
  });

  it('should handle different search queries', async () => {
    const queries = ['nature', 'urban', 'landscape'];
    
    for (const query of queries) {
      const result = await fetchPhotoWorks(query);
      expect(result).toBeDefined();
      expect(Array.isArray(result.artworks)).toBe(true);
    }
  });

  it('should throw error for empty query', async () => {
    await expect(fetchPhotoWorks('')).rejects.toThrow();
  });

  it('should include required photo properties', async () => {
    const result = await fetchPhotoWorks('test');
    
    if (result.artworks.length > 0) {
      const photo = result.artworks[0];
      expect(photo).toHaveProperty('id');
      expect(photo).toHaveProperty('url');
      expect(photo).toHaveProperty('photographer');
    }
  });
});
