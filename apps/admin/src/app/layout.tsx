import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "./apollo-wrapper";

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
				<UserProvider>
					<ApolloWrapper>{children}</ApolloWrapper>
				</UserProvider>
			</body>
		</html>
	);
}
