"use client";

import {
	ChevronLeft,
	ChevronRight,
	Calendar,
	Check,
	X,
	AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeekCalendarCell } from "./WeekCalendarCell";
import { useWeekCalendar } from "@/hooks/useWeekCalendar";
import {
	getDaysInWeek,
	formatDate,
	formatWeekDay,
	formatMonthDay,
	isDateToday,
} from "@/utils/date";
import { cn } from "@/lib/utils";

interface WeekCalendarProps {
	storeName: string;
}

// 表示する時間帯（7:00-22:00）
const DISPLAY_HOURS = Array.from({ length: 16 }, (_, i) => i + 7);

export function WeekCalendar({ storeName }: WeekCalendarProps) {
	const { currentWeek, getDayInfo, toggleDayStatus, navigateWeek, goToToday } =
		useWeekCalendar();

	const days = getDaysInWeek(currentWeek);

	return (
		<div className="w-full">
			{/* ヘッダー */}
			<div className="mb-6 flex items-center justify-between">
				<Button variant="outline" size="icon" onClick={() => navigateWeek("prev")}>
					<ChevronLeft className="h-4 w-4" />
				</Button>

				<div className="flex items-center gap-4">
					<h2 className="text-2xl font-bold">
						{storeName} - {formatDate(currentWeek, "yyyy年M月")} 第
						{Math.ceil(currentWeek.getDate() / 7)}週
					</h2>
					<Button variant="outline" size="sm" onClick={goToToday}>
						<Calendar className="mr-2 h-4 w-4" />
						今週へ
					</Button>
				</div>

				<Button variant="outline" size="icon" onClick={() => navigateWeek("next")}>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>

			{/* 週間カレンダー本体 */}
			<div className="overflow-x-auto">
				<div className="min-w-[800px]">
					{/* 曜日ヘッダー */}
					<div className="grid grid-cols-8 border-t border-l border-gray-200">
						<div className="h-20 border-r border-b border-gray-200 bg-gray-50"></div>
						{days.map((date) => {
							const dayInfo = getDayInfo(date);
							const isToday = isDateToday(date);

							return (
								<div
									key={date.toISOString()}
									className={cn(
										"border-r border-b border-gray-200 p-2 text-center cursor-pointer transition-all duration-200",
										{
											"bg-blue-50": isToday,
											"bg-green-50 hover:bg-green-100": dayInfo.status === "open",
											"bg-red-50 hover:bg-red-100": dayInfo.status === "closed",
											"bg-yellow-50 hover:bg-yellow-100": dayInfo.status === "special",
										}
									)}
									onClick={() => toggleDayStatus(date)}
								>
									<div className={cn("text-sm font-medium", isToday && "text-blue-600")}>
										{formatWeekDay(date)}
									</div>
									<div className={cn("text-lg", isToday && "font-bold text-blue-600")}>
										{formatMonthDay(date)}
									</div>
									<div className="mt-1">
										{dayInfo.status === "open" && (
											<Check className="h-4 w-4 text-green-600 mx-auto" />
										)}
										{dayInfo.status === "closed" && (
											<X className="h-4 w-4 text-red-600 mx-auto" />
										)}
										{dayInfo.status === "special" && (
											<AlertCircle className="h-4 w-4 text-yellow-600 mx-auto" />
										)}
									</div>
								</div>
							);
						})}
					</div>

					{/* 時間軸と各日のセル */}
					<div className="grid grid-cols-8 border-l border-gray-200">
						{DISPLAY_HOURS.map((hour) => (
							<>
								{/* 時間ラベル */}
								<div
									key={`hour-${hour}`}
									className="h-12 border-r border-b border-gray-200 bg-gray-50 flex items-center justify-center text-sm font-medium text-gray-600"
								>
									{hour}:00
								</div>

								{/* 各曜日のセル */}
								{days.map((date) => {
									const dayInfo = getDayInfo(date);
									return (
										<WeekCalendarCell
											key={`${date.toISOString()}-${hour}`}
											dayInfo={dayInfo}
											hour={hour}
											onClick={() => toggleDayStatus(date)}
										/>
									);
								})}
							</>
						))}
					</div>
				</div>
			</div>

			{/* 使い方の説明 */}
			<div className="mt-4 rounded-lg bg-gray-100 p-4">
				<p className="text-sm text-gray-600">
					💡
					日付をクリックして営業状態を切り替えられます。緑色の部分が営業時間を表します。
				</p>
			</div>
		</div>
	);
}
