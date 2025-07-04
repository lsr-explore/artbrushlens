import { describe, it, expect } from 'vitest';
import { postAnalyzeArt } from '../postAnalyzeArt';
import { mockArtwork, mockAnalysisResult } from '../../../../mocks/dist/data';

describe('postAnalyzeArt', () => {
  it('should analyze artwork successfully', async () => {
    const result = await postAnalyzeArt(mockArtwork);
    
    expect(result).toBeDefined();
    expect(result.result).toBe(mockAnalysisResult.result);
  });

  it('should handle artwork without description', async () => {
    const artworkWithoutDescription = {
      id: mockArtwork.id,
      title: mockArtwork.title,
      artist: mockArtwork.artist,
      imageUrl: mockArtwork.imageUrl,
      metId: mockArtwork.metId,
      aiAnalysis: mockArtwork.aiAnalysis
    };
    
    const result = await postAnalyzeArt(artworkWithoutDescription);
    expect(result).toBeDefined();
    expect(typeof result.result).toBe('string');
  });

  it('should throw error for invalid artwork', async () => {
    const invalidArtwork = {
      id: '',
      title: '',
      artist: ''
    };
    
    await expect(postAnalyzeArt(invalidArtwork as never)).rejects.toThrow();
  });

  it('should return meaningful analysis', async () => {
    const result = await postAnalyzeArt(mockArtwork);
    
    expect(result.result).toBeTruthy();
    expect(result.result.length).toBeGreaterThan(10);
    expect(typeof result.result).toBe('string');
  });
});
