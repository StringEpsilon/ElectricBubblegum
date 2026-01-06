import { signal } from "@preact/signals";

export const videoSignal = signal<MediaStream | null>(null);

export function endCapture() {
	const source = videoSignal.peek();
	if (source) {
		source?.getTracks().forEach(x => x.stop());
		videoSignal.value = null;
	}
}

export async function requestCapture() {
	endCapture();
	var stream = await navigator.mediaDevices.getDisplayMedia({ audio: false, video: { frameRate: 60 } });
	if (stream) {
		// There's probably a better way, but I could not find it.
		const interval = setInterval(() => {
			if (!stream.active) {
				endCapture();
				clearTimeout(interval);
			}
		}, 100);
		stream.addEventListener("stop", endCapture);
		videoSignal.value = stream;
	}
}