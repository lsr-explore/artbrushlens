import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "./apollo-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ArtBrushLens",
	description: "AI-powered art analysis platform",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ApolloWrapper>{children}</ApolloWrapper>
			</body>
		</html>
	);
}
