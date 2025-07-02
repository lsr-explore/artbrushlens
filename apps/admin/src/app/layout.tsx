// apps/admin/src/app/layout.tsx

import { Inter } from "next/font/google";
import { ReactQueryProvider } from "./react-query-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "ArtBrushLens Admin",
	description: "Admin panel for ArtBrushLens",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ReactQueryProvider>{children}</ReactQueryProvider>
			</body>
		</html>
	);
};

export default RootLayout;
