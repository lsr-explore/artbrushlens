import { describe, it, expect } from 'vitest';
import { postDetectObjects } from '../postDetectObjects';
import { mockDetectionResult } from '../../../../mocks/dist/data';

interface DetectionResult {
  label: string;
  score: number;
  box: { xmin: number; ymin: number; xmax: number; ymax: number };
}

describe('postDetectObjects', () => {
  const mockImageData = new ArrayBuffer(8);

  it('should detect objects successfully', async () => {
    const result = await postDetectObjects(mockImageData);
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(mockDetectionResult.objects.length);
  });

  it('should return objects with required properties', async () => {
    const result = await postDetectObjects(mockImageData);
    
    if (result.length > 0) {
      const detection = result[0];
      expect(detection).toHaveProperty('label');
      expect(detection).toHaveProperty('score');
      expect(detection).toHaveProperty('box');
      expect(detection.box).toHaveProperty('xmin');
      expect(detection.box).toHaveProperty('ymin');
      expect(detection.box).toHaveProperty('xmax');
      expect(detection.box).toHaveProperty('ymax');
    }
  });

  it('should handle empty image data', async () => {
    const emptyData = new ArrayBuffer(0);
    await expect(postDetectObjects(emptyData)).rejects.toThrow();
  });

  it('should return valid confidence scores', async () => {
    const result = await postDetectObjects(mockImageData);
    
    result.forEach((detection: DetectionResult) => {
      expect(detection.score).toBeGreaterThanOrEqual(0);
      expect(detection.score).toBeLessThanOrEqual(1);
    });
  });
});
