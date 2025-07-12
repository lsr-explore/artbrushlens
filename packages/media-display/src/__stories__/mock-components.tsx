import React from "react";

// Mock Next.js Image component
export const Image = ({
	src,
	alt,
	width,
	height,
	sizes,
	className,
	onError,
}: {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	sizes?: string;
	className?: string;
	onError?: (e: { currentTarget: { src: string } }) => void;
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
export const Link = ({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) => {
	return (
		<a href={href} className="inline-block">
			{children}
		</a>
	);
};
