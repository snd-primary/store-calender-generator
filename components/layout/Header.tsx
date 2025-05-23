"use client";

import { useState } from "react";
import { Calendar, Download, Settings, Loader2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportToImage, exportForInstagram } from "@/utils/export";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
	onExport?: () => void;
}

export function Header({ onExport }: HeaderProps) {
	const [isExporting, setIsExporting] = useState(false);
	const { toast } = useToast();

	const handleExport = async (type: "normal" | "instagram" = "normal") => {
		setIsExporting(true);

		try {
			if (type === "instagram") {
				await exportForInstagram("calendar-export-container");
				toast({
					title: "エクスポート完了",
					description: "Instagram用の画像を保存しました",
				});
			} else {
				await exportToImage("calendar-export-container");
				toast({
					title: "エクスポート完了",
					description: "カレンダー画像を保存しました",
				});
			}

			if (onExport) {
				onExport();
			}
		} catch (error) {
			toast({
				title: "エクスポート失敗",
				description: "画像の保存に失敗しました。もう一度お試しください。",
				variant: "destructive",
			});
		} finally {
			setIsExporting(false);
		}
	};

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

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size="sm" disabled={isExporting}>
									{isExporting ? (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									) : (
										<Download className="mr-2 h-4 w-4" />
									)}
									画像として保存
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => handleExport("normal")}>
									<Download className="mr-2 h-4 w-4" />
									通常サイズで保存
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleExport("instagram")}>
									<Camera className="mr-2 h-4 w-4" />
									Instagram用（正方形）で保存
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	);
}
