import {
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	format,
	getDay,
	startOfWeek,
	endOfWeek,
	isSameMonth,
	isToday,
} from "date-fns";
import { ja } from "date-fns/locale";

export const getDaysInMonth = (date: Date) => {
	const start = startOfMonth(date);
	const end = endOfMonth(date);

	// 月の最初の週の日曜日から、最後の週の土曜日まで取得
	const calendarStart = startOfWeek(start);
	const calendarEnd = endOfWeek(end);

	return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
};

export const formatDate = (date: Date, formatStr: string) => {
	return format(date, formatStr, { locale: ja });
};

export const getDayOfWeek = (date: Date) => {
	return getDay(date);
};

export const isSameMonthAsDate = (date: Date, compareDate: Date) => {
	return isSameMonth(date, compareDate);
};

export const isDateToday = (date: Date) => {
	return isToday(date);
};

// 日本の祝日かどうかを判定する簡易版（実際はAPIや祝日ライブラリを使用）
export const isH;
