import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "営業日カレンダー作成ツール",
	description:
		"店舗の営業日カレンダーを簡単に作成し、画像としてダウンロードできます",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={inter.className}>
				<div className="min-h-screen bg-background">{children}</div>
			</body>
		</html>
	);
}
