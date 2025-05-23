import html2canvas from "html2canvas";

export interface ExportOptions {
	filename?: string;
	format?: "png" | "jpeg";
	quality?: number;
	scale?: number;
}

export const exportToImage = async (
	elementId: string,
	options: ExportOptions = {}
) => {
	const {
		filename = `calendar-${new Date().toISOString().split("T")[0]}`,
		format = "png",
		quality = 0.95,
		scale = 2,
	} = options;

	try {
		const element = document.getElementById(elementId);
		if (!element) {
			throw new Error("Element not found");
		}

		// エクスポート中のフラグを設定
		element.setAttribute("data-exporting", "true");

		// スクロールバーを一時的に非表示
		const originalOverflow = element.style.overflow;
		element.style.overflow = "hidden";

		// 少し待機（DOMの更新を待つ）
		await new Promise((resolve) => setTimeout(resolve, 100));

		const canvas = await html2canvas(element, {
			scale,
			useCORS: true,
			logging: false,
			backgroundColor: "#ffffff",
			windowWidth: element.scrollWidth,
			windowHeight: element.scrollHeight,
			onclone: (clonedDoc) => {
				const clonedElement = clonedDoc.getElementById(elementId);
				if (clonedElement) {
					// クローンされた要素でエクスポート用スタイルを有効化
					clonedElement.querySelectorAll(".export-only").forEach((el) => {
						(el as HTMLElement).style.display = "block";
					});
				}
			},
		});

		// フラグとスタイルを元に戻す
		element.removeAttribute("data-exporting");
		element.style.overflow = originalOverflow;

		// 画像をダウンロード
		const link = document.createElement("a");
		link.download = `${filename}.${format}`;

		if (format === "jpeg") {
			link.href = canvas.toDataURL("image/jpeg", quality);
		} else {
			link.href = canvas.toDataURL("image/png");
		}

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		return true;
	} catch (error) {
		console.error("Export failed:", error);
		throw error;
	}
};

// Instagram用の正方形画像として出力
export const exportForInstagram = async (elementId: string) => {
	const element = document.getElementById(elementId);
	if (!element) {
		throw new Error("Element not found");
	}

	element.setAttribute("data-instagram", "true");

	try {
		await exportToImage(elementId, {
			filename: `instagram-calendar-${new Date().toISOString().split("T")[0]}`,
			format: "jpeg",
			quality: 0.9,
			scale: 1,
		});
	} finally {
		element.removeAttribute("data-instagram");
	}
};
