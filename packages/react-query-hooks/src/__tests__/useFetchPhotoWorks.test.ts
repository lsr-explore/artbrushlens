import { describe, it, expect, waitFor } from 'vitest';
import { useFetchPhotoWorks } from '../useFetchPhotoWorks';
import { renderHookWithQueryClient } from './test-utils';
import { mockPhotoWorks } from '../../../../mocks/dist/data';

describe('useFetchPhotoWorks', () => {
  it('should fetch photo works successfully', async () => {
    const { result } = renderHookWithQueryClient(() => 
      useFetchPhotoWorks('city street')
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.artworks).toHaveLength(mockPhotoWorks.length);
    expect(result.current.error).toBe(null);
  });

  it('should not fetch when query is empty', () => {
    const { result } = renderHookWithQueryClient(() => 
      useFetchPhotoWorks('')
    );

    expect(result.current.isPending).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('should handle different search terms', async () => {
    const queries = ['nature', 'urban', 'landscape'];
    
    for (const query of queries) {
      const { result } = renderHookWithQueryClient(() => 
        useFetchPhotoWorks(query)
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data?.artworks).toBeDefined();
    }
  });

  it('should be enabled by default', () => {
    const { result } = renderHookWithQueryClient(() => 
      useFetchPhotoWorks('test')
    );

    expect(result.current.isPending).toBe(true);
  });

  it('should respect enabled parameter', () => {
    const { result } = renderHookWithQueryClient(() => 
      useFetchPhotoWorks('test', false)
    );

    expect(result.current.isPending).toBe(false);
  });
});
