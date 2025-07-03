import type { Artwork } from '@artbrushlens/shared-types';
export declare const mockArtwork: Artwork;
export declare const mockArtworks: Artwork[];
export declare const mockPhotoWork: {
    id: string;
    title: string;
    photographer: string;
    url: string;
    description: string;
    tags: string[];
};
export declare const mockPhotoWorks: {
    id: string;
    title: string;
    photographer: string;
    url: string;
    description: string;
    tags: string[];
}[];
export declare const mockDetectionResult: {
    objects: {
        label: string;
        score: number;
        box: {
            xmin: number;
            ymin: number;
            xmax: number;
            ymax: number;
        };
    }[];
};
export declare const mockAnalysisResult: {
    result: string;
};
export declare const mockErrorResponse: {
    error: string;
    message: string;
};
