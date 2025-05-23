"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { MonthCalendar } from "@/components/calender/MonthCalender";
import { CalendarView } from "@/types/calender";

export default function Home() {
	const [storeName, setStoreName] = useState("サンプル店舗");
	const [view, setView] = useState<CalendarView>("month");

	const handleExport = () => {
		// TODO: 画像エクスポート機能を実装
		console.log("画像をエクスポート");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Header onExport={handleExport} />

			<div className="container mx-auto px-4 py-8">
				<div className="flex gap-8">
					<Sidebar
						storeName={storeName}
						onStoreNameChange={setStoreName}
						view={view}
						onViewChange={setView}
					/>

					<main className="flex-1">
						<div
							className="rounded-lg bg-white p-8 shadow-sm"
							id="calendar-container"
						>
							{view === "month" ? (
								<MonthCalendar storeName={storeName} />
							) : (
								<div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
									<p className="text-gray-500">週間カレンダーは次に実装します</p>
								</div>
							)}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
