"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarView } from "../../types/calender";

interface SidebarProps {
	storeName: string;
	onStoreNameChange: (name: string) => void;
	view: CalendarView;
	onViewChange: (view: CalendarView) => void;
}

export function Sidebar({
	storeName,
	onStoreNameChange,
	view,
	onViewChange,
}: SidebarProps) {
	return (
		<aside className="w-80 space-y-6">
			<Card className="p-6">
				<h3 className="mb-4 text-lg font-semibold">基本設定</h3>

				<div className="space-y-4">
					<div>
						<Label htmlFor="storeName">店舗名</Label>
						<Input
							id="storeName"
							value={storeName}
							onChange={(e) => onStoreNameChange(e.target.value)}
							placeholder="〇〇カフェ"
							className="mt-1"
						/>
					</div>

					<div>
						<Label>表示形式</Label>
						<Tabs value={view} onValueChange={(v) => onViewChange(v as CalendarView)}>
							<TabsList className="grid w-full grid-cols-2 mt-1">
								<TabsTrigger value="month">月間</TabsTrigger>
								<TabsTrigger value="week">週間</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
				</div>
			</Card>

			<Card className="p-6">
				<h3 className="mb-4 text-lg font-semibold">営業時間設定</h3>

				<div className="space-y-4">
					<div className="grid grid-cols-2 gap-2">
						<div>
							<Label htmlFor="openTime">開店時間</Label>
							<Input id="openTime" type="time" defaultValue="09:00" className="mt-1" />
						</div>
						<div>
							<Label htmlFor="closeTime">閉店時間</Label>
							<Input
								id="closeTime"
								type="time"
								defaultValue="18:00"
								className="mt-1"
							/>
						</div>
					</div>
				</div>
			</Card>

			<Card className="p-6">
				<h3 className="mb-4 text-lg font-semibold">凡例</h3>

				<div className="space-y-2">
					<div className="flex items-center space-x-2">
						<div className="h-6 w-6 rounded-full bg-green-500"></div>
						<span className="text-sm">営業日</span>
					</div>
					<div className="flex items-center space-x-2">
						<div className="h-6 w-6 rounded-full bg-red-500"></div>
						<span className="text-sm">休業日</span>
					</div>
					<div className="flex items-center space-x-2">
						<div className="h-6 w-6 rounded-full bg-yellow-500"></div>
						<span className="text-sm">特別営業</span>
					</div>
				</div>
			</Card>
		</aside>
	);
}
