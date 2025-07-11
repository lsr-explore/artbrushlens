import React from "react";

// Mock Next.js Image component
export const MockNextImage = ({ 
	src, 
	alt, 
	width, 
	height, 
	className, 
	onError 
}: {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
	onError?: (event: { currentTarget: { src: string } }) => void;
}) => {
	return (
		<img
			src={src}
			alt={alt}
			width={width}
			height={height}
			className={className}
			onError={onError}
		/>
	);
};

// Mock Next.js Link component
export const MockNextLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
	return (
		<a href={href} className="inline-block">
			{children}
		</a>
	);
};

// Set up global mocks for Next.js components
export const setupNextJsMocks = () => {
	if (typeof globalThis !== 'undefined') {
		(globalThis as Record<string, unknown>).__NEXT_IMAGE_MOCK__ = MockNextImage;
		(globalThis as Record<string, unknown>).__NEXT_LINK_MOCK__ = MockNextLink;
	}
}; 