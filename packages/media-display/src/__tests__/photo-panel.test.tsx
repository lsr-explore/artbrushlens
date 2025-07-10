import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import type { Artwork } from "@artbrushlens/shared-types";
import { PhotoPanel } from "../components/photo-panel";

// Mock Next.js components
vi.mock("next/image", () => ({
	default: ({ src, alt, className, onError, ...props }: any) => (
		<img
			src={src}
			alt={alt}
			className={className}
			onError={onError}
			{...props}
		/>
	),
}));

vi.mock("next/link", () => ({
	default: ({ href, children, ...props }: any) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

const mockArtwork: Artwork = {
	id: "test-123",
	title: "Test Artwork",
	artist: "Test Artist",
	imageUrl: "https://example.com/test-image.jpg",
	description: "A test artwork description",
};

const mockArtworkWithoutImage: Artwork = {
	id: "test-456",
	title: "Test Artwork No Image",
	artist: "Test Artist",
	description: "A test artwork without image",
};

describe("PhotoPanel", () => {
	it("should render artwork with image", () => {
		render(<PhotoPanel artwork={mockArtwork} />);

		expect(screen.getByText("Test Artwork")).toBeInTheDocument();
		expect(screen.getByText("Test Artist")).toBeInTheDocument();
		expect(screen.getByText("A test artwork description")).toBeInTheDocument();
		expect(screen.getByText("ID: test-123")).toBeInTheDocument();
		expect(screen.getByText("Analyze Image")).toBeInTheDocument();
	});

	it("should render artwork without image", () => {
		render(<PhotoPanel artwork={mockArtworkWithoutImage} />);

		expect(screen.getByText("Test Artwork No Image")).toBeInTheDocument();
		expect(screen.getByText("Test Artist")).toBeInTheDocument();
		expect(
			screen.getByText("A test artwork without image"),
		).toBeInTheDocument();
		expect(screen.getByText("ID: test-456")).toBeInTheDocument();
		expect(screen.getByText("🎨")).toBeInTheDocument();
	});

	it("should have correct CSS classes for card styling", () => {
		const { container } = render(<PhotoPanel artwork={mockArtwork} />);

		const card = container.firstChild as HTMLElement;
		expect(card).toHaveClass(
			"bg-white",
			"rounded-lg",
			"shadow-md",
			"overflow-hidden",
			"hover:shadow-lg",
			"transition-shadow",
			"duration-300",
		);
	});

	it("should have correct data-testid", () => {
		const { container } = render(<PhotoPanel artwork={mockArtwork} />);

		const card = container.firstChild as HTMLElement;
		expect(card).toHaveAttribute("data-testid", "artwork-card");
	});

	it("should render image with correct attributes", () => {
		render(<PhotoPanel artwork={mockArtwork} />);

		const image = screen.getByAltText("Test Artwork");
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute("src", "https://example.com/test-image.jpg");
		expect(image).toHaveClass("w-full", "h-full", "object-cover");
	});

	it("should have correct link structure for analyze button", () => {
		render(<PhotoPanel artwork={mockArtwork} />);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute(
			"href",
			"/images/analyze/test-123?imageUrl=https%3A%2F%2Fexample.com%2Ftest-image.jpg&title=Test%20Artwork&artist=Test%20Artist&description=A%20test%20artwork%20description&id=test-123",
		);
	});

	it("should have correct button styling", () => {
		render(<PhotoPanel artwork={mockArtwork} />);

		const button = screen.getByRole("button");
		expect(button).toHaveClass(
			"button-background",
			"text-white",
			"text-xs",
			"px-4",
			"py-2",
			"rounded",
			"hover:bg-indigo-600",
		);
	});

	it("should handle artwork with missing optional fields", () => {
		const minimalArtwork: Artwork = {
			id: "minimal-123",
			title: "Minimal Artwork",
		};

		render(<PhotoPanel artwork={minimalArtwork} />);

		expect(screen.getByText("Minimal Artwork")).toBeInTheDocument();
		expect(screen.getByText("ID: minimal-123")).toBeInTheDocument();
		expect(screen.getByText("Analyze Image")).toBeInTheDocument();
		// Should not crash when artist and description are undefined
	});

	it("should have correct image container styling", () => {
		const { container } = render(<PhotoPanel artwork={mockArtwork} />);

		const imageContainer = container.querySelector(".bg-red-500");
		expect(imageContainer).toBeInTheDocument();
		expect(imageContainer).toHaveClass("bg-red-500", "p-4");
	});

	it("should have correct content container styling", () => {
		const { container } = render(<PhotoPanel artwork={mockArtwork} />);

		const contentContainer = container.querySelector(".p-4");
		expect(contentContainer).toBeInTheDocument();
	});

	it("should have correct title styling", () => {
		const { container } = render(<PhotoPanel artwork={mockArtwork} />);

		const title = container.querySelector("h3");
		expect(title).toHaveClass(
			"font-semibold",
			"text-lg",
			"text-gray-900",
			"mb-1",
			"line-clamp-2",
		);
	});

	it("should have correct artist styling", () => {
		const { container } = render(<PhotoPanel artwork={mockArtwork} />);

		const artist = container.querySelector("p");
		expect(artist).toHaveClass("text-gray-600", "text-sm", "mb-2");
	});

	it("should have correct description styling", () => {
		const { container } = render(<PhotoPanel artwork={mockArtwork} />);

		const description = container.querySelectorAll("p")[1];
		expect(description).toHaveClass(
			"text-gray-500",
			"text-xs",
			"mb-4",
			"line-clamp-2",
		);
	});

	it("should have correct action container styling", () => {
		const { container } = render(<PhotoPanel artwork={mockArtwork} />);

		const actionContainer = container.querySelector(
			".flex.justify-between.items-center",
		);
		expect(actionContainer).toBeInTheDocument();
	});
});
