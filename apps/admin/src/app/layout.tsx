// apps/admin/src/app/layout.tsx
import { ReactQueryProvider } from "./react-query-provider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "ArtBrushLens Admin",
	description: "Admin panel for ArtBrushLens",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ReactQueryProvider>{children}</ReactQueryProvider>
			</body>
		</html>
	);
}
