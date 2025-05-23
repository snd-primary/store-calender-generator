"use client";

import { cn } from "@/lib/utils";
import { DayInfo } from "@/types/calendar";
import { isDateToday, isSameMonthAsDate } from "@/utils/date";
import { Check, X, AlertCircle } from "lucide-react";

interface CalendarCellProps {
	dayInfo: DayInfo;
	currentMonth: Date;
	onClick: () => void;
}

export function CalendarCell({
	dayInfo,
	currentMonth,
	onClick,
}: CalendarCellProps) {
	const isCurrentMonth = isSameMonthAsDate(dayInfo.date, currentMonth);
	const isToday = isDateToday(dayInfo.date);

	const statusConfig = {
		open: {
			icon: Check,
			bgColor: "bg-green-100 hover:bg-green-200",
			iconColor: "text-green-600",
			borderColor: "border-green-300",
		},
		closed: {
			icon: X,
			bgColor: "bg-red-100 hover:bg-red-200",
			iconColor: "text-red-600",
			borderColor: "border-red-300",
		},
		special: {
			icon: AlertCircle,
			bgColor: "bg-yellow-100 hover:bg-yellow-200",
			iconColor: "text-yellow-600",
			borderColor: "border-yellow-300",
		},
	};

	const config = statusConfig[dayInfo.status];
	const Icon = config.icon;

	return (
		<button
			onClick={onClick}
			className={cn(
				"relative aspect-square p-2 transition-all duration-200",
				"border",
				isCurrentMonth ? config.bgColor : "bg-gray-50 hover:bg-gray-100",
				isCurrentMonth ? config.borderColor : "border-gray-200",
				isToday && "ring-2 ring-blue-400 ring-offset-2",
				"cursor-pointer"
			)}
		>
			<div className="flex h-full flex-col">
				<div className="flex items-start justify-between">
					<span
						className={cn(
							"text-sm font-medium",
							isCurrentMonth ? "text-gray-900" : "text-gray-400"
						)}
					>
						{dayInfo.date.getDate()}
					</span>
					{isCurrentMonth && <Icon className={cn("h-5 w-5", config.iconColor)} />}
				</div>

				{dayInfo.hours && isCurrentMonth && (
					<div className="mt-auto">
						<p className="text-xs text-gray-600">
							{dayInfo.hours.openTime}-{dayInfo.hours.closeTime}
						</p>
					</div>
				)}

				{dayInfo.note && isCurrentMonth && (
					<p className="mt-1 text-xs text-gray-500 line-clamp-2">{dayInfo.note}</p>
				)}
			</div>
		</button>
	);
}
