"use client";

import { ReactNode } from "react";

interface ExportWrapperProps {
	children: ReactNode;
	storeName: string;
}

export function ExportWrapper({ children, storeName }: ExportWrapperProps) {
	return (
		<div id="calendar-export-container" className="bg-white">
			{/* エクスポート時のみ表示される装飾 */}
			<div className="export-only hidden print:block">
				<div className="text-center mb-4 pb-4 border-b">
					<h1 className="text-3xl font-bold text-gray-900">{storeName}</h1>
					<p className="text-sm text-gray-600 mt-2">営業日カレンダー</p>
				</div>
			</div>

			{children}

			{/* エクスポート時のみ表示されるフッター */}
			<div className="export-only hidden print:block">
				<div className="mt-6 pt-4 border-t text-center">
					<p className="text-xs text-gray-500">
						※営業時間は変更になる場合があります
					</p>
				</div>
			</div>
		</div>
	);
}
