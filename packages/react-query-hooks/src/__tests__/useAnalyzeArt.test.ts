import { describe, it, expect } from 'vitest';
import { waitFor } from '@testing-library/react';
import { useAnalyzeArt } from '../useAnalyzeArt';
import { renderHookWithQueryClient } from './test-utils';
import { mockArtwork, mockAnalysisResult } from '../../../../mocks/dist/data';

describe('useAnalyzeArt', () => {
  it('should analyze artwork successfully', async () => {
    const { result } = renderHookWithQueryClient(() => useAnalyzeArt());

    expect(result.current.isPending).toBe(false);
    expect(result.current.isIdle).toBe(true);

    // Trigger the mutation
    result.current.mutate(mockArtwork);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.result).toBe(mockAnalysisResult.result);
    expect(result.current.error).toBe(null);
  });

  it('should handle mutation errors', async () => {
    const { result } = renderHookWithQueryClient(() => useAnalyzeArt());

    const invalidArtwork = {
      id: '',
      title: '',
      artist: ''
    };

    result.current.mutate(invalidArtwork as any);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
  });

  it('should reset mutation state', async () => {
    const { result } = renderHookWithQueryClient(() => useAnalyzeArt());

    result.current.mutate(mockArtwork);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    result.current.reset();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(false);
    });
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe(null);
  });

  it('should support async mutation', async () => {
    const { result } = renderHookWithQueryClient(() => useAnalyzeArt());

    const mutatePromise = result.current.mutateAsync(mockArtwork);

    await expect(mutatePromise).resolves.toEqual(mockAnalysisResult);
  });

  it('should track loading state correctly', async () => {
    const { result } = renderHookWithQueryClient(() => useAnalyzeArt());

    expect(result.current.isPending).toBe(false);

    result.current.mutate(mockArtwork);

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });
  });
});
