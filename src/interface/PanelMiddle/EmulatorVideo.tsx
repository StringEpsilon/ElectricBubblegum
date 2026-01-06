import "./video.css";
import { endCapture, requestCapture,  videoSignal } from "../../components/VideoContext";

export function EmulatorVideo() {
	const source = videoSignal.value;
	if (source === null) {
		return (
			<div class="video-container">
				<button type="button" onClick={requestCapture}>Capture emulator window</button>
			</div>
		);
	}
	return (
		<div class="video-container">
			<button type="button" id="end-capture" onClick={endCapture}>X</button>
			<video 
				
				width="100%" 
				srcObject={source} 
				onLoadedMetadata={(e) => e.currentTarget?.play()}
			/>
		</div>
	)
}