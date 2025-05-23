import { useState, useCallback } from "react";
import { BusinessStatus, DayInfo } from "@/types/calendar";
import { startOfMonth } from "date-fns";

export const useCalendar = (initialDate: Date = new Date()) => {
	const [currentDate, setCurrentDate] = useState(startOfMonth(initialDate));
	const [dayInfoMap, setDayInfoMap] = useState<Map<string, DayInfo>>(new Map());

	const getDateKey = (date: Date): string => {
		return date.toISOString().split("T")[0];
	};

	const getDayInfo = useCallback(
		(date: Date): DayInfo => {
			const key = getDateKey(date);
			return (
				dayInfoMap.get(key) || {
					date,
					status: "open",
					hours: {
						openTime: "09:00",
						closeTime: "18:00",
					},
				}
			);
		},
		[dayInfoMap]
	);

	const updateDayInfo = useCallback(
		(date: Date, info: Partial<DayInfo>) => {
			const key = getDateKey(date);
			const currentInfo = getDayInfo(date);

			setDayInfoMap((prev) => {
				const newMap = new Map(prev);
				newMap.set(key, { ...currentInfo, ...info, date });
				return newMap;
			});
		},
		[getDayInfo]
	);

	const toggleDayStatus = useCallback(
		(date: Date) => {
			const currentInfo = getDayInfo(date);
			const statusOrder: BusinessStatus[] = ["open", "closed", "special"];
			const currentIndex = statusOrder.indexOf(currentInfo.status);
			const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];

			updateDayInfo(date, { status: nextStatus });
		},
		[getDayInfo, updateDayInfo]
	);

	const navigateMonth = useCallback((direction: "prev" | "next") => {
		setCurrentDate((prev) => {
			const newDate = new Date(prev);
			if (direction === "prev") {
				newDate.setMonth(prev.getMonth() - 1);
			} else {
				newDate.setMonth(prev.getMonth() + 1);
			}
			return startOfMonth(newDate);
		});
	}, []);

	return {
		currentDate,
		dayInfoMap,
		getDayInfo,
		updateDayInfo,
		toggleDayStatus,
		navigateMonth,
	};
};
