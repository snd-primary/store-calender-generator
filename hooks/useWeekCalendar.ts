import { useState, useCallback } from "react";
import { startOfWeek, addWeeks } from "date-fns";
import { useCalendar } from "./useCalendar";

export const useWeekCalendar = (initialDate: Date = new Date()) => {
	const [currentWeek, setCurrentWeek] = useState(startOfWeek(initialDate));
	const { dayInfoMap, getDayInfo, updateDayInfo, toggleDayStatus } =
		useCalendar(currentWeek);

	const navigateWeek = useCallback((direction: "prev" | "next") => {
		setCurrentWeek((prev) => {
			return direction === "prev" ? addWeeks(prev, -1) : addWeeks(prev, 1);
		});
	}, []);

	const goToToday = useCallback(() => {
		setCurrentWeek(startOfWeek(new Date()));
	}, []);

	return {
		currentWeek,
		dayInfoMap,
		getDayInfo,
		updateDayInfo,
		toggleDayStatus,
		navigateWeek,
		goToToday,
	};
};
