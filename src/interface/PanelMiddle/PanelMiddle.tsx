import "./panel-middle.css"
import { useState } from "preact/hooks";
import { EmulatorVideo } from "./EmulatorVideo";
import { Legal } from "./Legal";

export function PanelMiddle() {
	const [playArea, setPlayArea] = useState<"video" | "options" | "license">("video");
	return (
		<div class="panel-middle">
			<div class="middle-tabs">
				<button 
					class={"tab " + (playArea == "video" ? "active" : "")} 
					onClick={() => setPlayArea("video")}
				>
					Game
				</button>
				{/* <button 
					class={"tab " + (playArea == "options" ? "active" : "")} 
					onClick={() => setPlayArea("options")}
				>
					Options
				</button> */}
				<button 
					class={"tab " + (playArea == "license" ? "active" : "")} 
					onClick={() => setPlayArea("license")}
				>
					License(s)
				</button>
			</div>
			{playArea == "video" && <EmulatorVideo />}
			{playArea == "options" && <div class="config-panel">
				</div>}
			{playArea == "license" && <Legal />}
		</div>
	);
}

