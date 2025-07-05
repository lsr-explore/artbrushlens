import { describe, it, expect, vi, beforeEach } from 'vitest';
import { proxyImage } from '../proxy-image/proxyImage';

// Mock NextRequest
const mockRequest = (url: string) => ({
  nextUrl: {
    searchParams: {
      get: vi.fn().mockReturnValue(url)
    }
  }
}) as any;

// Mock fetch
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('proxyImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should return error when URL parameter is missing', async () => {
    const req = mockRequest(null);
    const response = await proxyImage(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: 'Missing image URL' });
  });

  it('should attempt to proxy image and call fetch', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const mockBuffer = new ArrayBuffer(1024);
    
    const mockResponse = {
      headers: {
        get: vi.fn().mockReturnValue('image/jpeg')
      },
      arrayBuffer: vi.fn().mockResolvedValue(mockBuffer)
    };
    
    mockFetch.mockResolvedValueOnce(mockResponse);

    const req = mockRequest(testUrl);
    const response = await proxyImage(req);

    expect(mockFetch).toHaveBeenCalled();
    expect(response).toBeInstanceOf(Response);
  });

  it('should handle basic functionality with valid URL', async () => {
    const testUrl = 'https://example.com/image.jpg';
    const mockBuffer = new ArrayBuffer(1024);
    
    const mockResponse = {
      headers: {
        get: vi.fn().mockReturnValue('image/png')
      },
      arrayBuffer: vi.fn().mockResolvedValue(mockBuffer)
    };
    
    mockFetch.mockResolvedValueOnce(mockResponse);

    const req = mockRequest(testUrl);
    const response = await proxyImage(req);

    expect(response).toBeInstanceOf(Response);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should handle fetch errors', async () => {
    const testUrl = 'https://example.com/image.jpg';
    
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const req = mockRequest(testUrl);
    const response = await proxyImage(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to proxy image: Network error');
  });
});
