"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalendar } from "../../hooks/useCalender";
import { getDaysInMonth, formatDate } from "@/utils/date";
import { cn } from "@/lib/utils";
import { CalendarCell } from "./CalenderCell";

interface MonthCalendarProps {
	storeName: string;
}

const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

export function MonthCalendar({ storeName }: MonthCalendarProps) {
	const { currentDate, getDayInfo, toggleDayStatus, navigateMonth } =
		useCalendar();

	const days = getDaysInMonth(currentDate);

	return (
		<div className="w-full">
			{/* ヘッダー */}
			<div className="mb-6 flex items-center justify-between">
				<Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
					<ChevronLeft className="h-4 w-4" />
				</Button>

				<h2 className="text-2xl font-bold">
					{storeName} - {formatDate(currentDate, "yyyy年M月")}
				</h2>

				<Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>

			{/* 曜日ヘッダー */}
			<div className="mb-2 grid grid-cols-7 gap-1">
				{weekDays.map((day, index) => (
					<div
						key={day}
						className={cn(
							"p-2 text-center text-sm font-medium",
							index === 0 && "text-red-600",
							index === 6 && "text-blue-600"
						)}
					>
						{day}
					</div>
				))}
			</div>

			{/* カレンダー本体 */}
			<div className="grid grid-cols-7 gap-1">
				{days.map((date) => {
					const dayInfo = getDayInfo(date);
					return (
						<CalendarCell
							key={date.toISOString()}
							dayInfo={dayInfo}
							currentMonth={currentDate}
							onClick={() => toggleDayStatus(date)}
						/>
					);
				})}
			</div>

			{/* 使い方の説明 */}
			<div className="mt-4 rounded-lg bg-gray-100 p-4">
				<p className="text-sm text-gray-600">
					💡 日付をクリックして営業状態を切り替えられます
				</p>
			</div>
		</div>
	);
}
