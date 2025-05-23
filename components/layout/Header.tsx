"use client";

import { Calendar, Download, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
	onExport: () => void;
}

export function Header({ onExport }: HeaderProps) {
	return (
		<header className="border-b bg-white shadow-sm">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<Calendar className="h-8 w-8 text-primary" />
						<h1 className="text-2xl font-bold text-gray-900">
							営業日カレンダー作成ツール
						</h1>
					</div>

					<div className="flex items-center space-x-4">
						<Button variant="outline" size="sm">
							<Settings className="mr-2 h-4 w-4" />
							設定
						</Button>
						<Button onClick={onExport} size="sm">
							<Download className="mr-2 h-4 w-4" />
							画像として保存
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
