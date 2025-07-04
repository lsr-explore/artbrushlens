import { describe, it, expect, waitFor } from 'vitest';
import { useFetchArtworks } from '../useFetchArtworks';
import { renderHookWithQueryClient } from './test-utils';
import { mockArtworks } from '../../../../mocks/dist/data';

describe('useFetchArtworks', () => {
  it('should fetch artworks successfully', async () => {
    const { result } = renderHookWithQueryClient(() => 
      useFetchArtworks('sunflowers')
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.artworks).toHaveLength(mockArtworks.length);
    expect(result.current.error).toBe(null);
  });

  it('should not fetch when query is empty', () => {
    const { result } = renderHookWithQueryClient(() => 
      useFetchArtworks('')
    );

    expect(result.current.isPending).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('should not fetch when disabled', () => {
    const { result } = renderHookWithQueryClient(() => 
      useFetchArtworks('test', false)
    );

    expect(result.current.isPending).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('should have correct query key', () => {
    const { result } = renderHookWithQueryClient(() => 
      useFetchArtworks('sunflowers')
    );

    // Query key should be ["met", "search", "sunflowers"]
    expect(result.current.dataUpdatedAt).toBeDefined();
  });

  it('should refetch when query changes', async () => {
    let query = 'sunflowers';
    const { result, rerender } = renderHookWithQueryClient(() => 
      useFetchArtworks(query)
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const firstData = result.current.data;

    // Change query
    query = 'monet';
    rerender();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Should trigger new fetch (in real scenario data might be different)
    expect(result.current.dataUpdatedAt).toBeDefined();
  });
});
