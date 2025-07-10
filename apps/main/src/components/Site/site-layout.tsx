import type { Metadata } from "next";
import React from "react";
import { Footer } from "./footer";
import { Header } from "./header";

export const metadata: Metadata = {
	title: "ArtLoupe",
	description: "AI-powered art analysis platform",
};

export const SiteLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
};
