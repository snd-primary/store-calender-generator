// カレンダー関連の型定義

export type BusinessStatus = "open" | "closed" | "special";

export interface BusinessHours {
	openTime: string;
	closeTime: string;
	breakTime?: {
		start: string;
		end: string;
	};
}

export interface DayInfo {
	date: Date;
	status: BusinessStatus;
	hours?: BusinessHours;
	note?: string;
}

export interface CalendarConfig {
	storeName: string;
	defaultHours: BusinessHours;
	theme: {
		primaryColor: string;
		accentColor: string;
	};
}

export type CalendarView = "month" | "week";
