"use client";

import { cn } from "@/lib/utils";
import { DayInfo } from "@/types/calendar";
import { Check, AlertCircle } from "lucide-react";

interface WeekCalendarCellProps {
	dayInfo: DayInfo;
	hour: number;
	onClick: () => void;
}

export function WeekCalendarCell({
	dayInfo,
	hour,
	onClick,
}: WeekCalendarCellProps) {
	const isOpen = dayInfo.status === "open";
	const isClosed = dayInfo.status === "closed";
	const isSpecial = dayInfo.status === "special";

	// 営業時間内かどうかをチェック
	const isWithinBusinessHours = () => {
		if (!dayInfo.hours || dayInfo.status === "closed") return false;

		const openHour = parseInt(dayInfo.hours.openTime.split(":")[0]);
		const closeHour = parseInt(dayInfo.hours.closeTime.split(":")[0]);

		// 休憩時間のチェック
		if (dayInfo.hours.breakTime) {
			const breakStartHour = parseInt(dayInfo.hours.breakTime.start.split(":")[0]);
			const breakEndHour = parseInt(dayInfo.hours.breakTime.end.split(":")[0]);

			if (hour >= breakStartHour && hour < breakEndHour) {
				return false;
			}
		}

		return hour >= openHour && hour < closeHour;
	};

	const isBusinessHour = isWithinBusinessHours();

	const cellClass = cn(
		"h-12 border-r border-b border-gray-200 cursor-pointer transition-all duration-200",
		{
			"bg-green-100 hover:bg-green-200": isOpen && isBusinessHour,
			"bg-gray-50 hover:bg-gray-100": isOpen && !isBusinessHour,
			"bg-red-50": isClosed,
			"bg-yellow-100 hover:bg-yellow-200": isSpecial && isBusinessHour,
		}
	);

	return (
		<div className={cellClass} onClick={onClick}>
			{hour === 9 && dayInfo.status !== "closed" && (
				<div className="flex items-center justify-center h-full">
					{isOpen && <Check className="h-4 w-4 text-green-600" />}
					{isSpecial && <AlertCircle className="h-4 w-4 text-yellow-600" />}
				</div>
			)}
		</div>
	);
}
