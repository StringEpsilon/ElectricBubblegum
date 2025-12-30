import "./video.css";
import { useContext } from "preact/hooks";
import { VideoContext } from "../../components/VideoContext";

export function EmulatorVideo() {
	const context = useContext(VideoContext);
	if (context.source === null) {
		return (
			<div class="video-container">
				<button type="button" onClick={() => context.requestSource()}>Record</button>
			</div>
		);
	}
	return (
		<div class="video-container">
			<video 
				onClick={()=> context.closeSource()}	
				width="100%" 
				srcObject={context.source} 
				onLoadedMetadata={(e) => e.currentTarget?.play()}
			/>
		</div>
	)
}