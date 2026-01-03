import "./panel-middle.css"
import { useState } from "preact/hooks";
import { EmulatorVideo } from "./EmulatorVideo";
import { Legal } from "./Legal";
import { playerStatsSignal } from "../../components/PartyProvider";

export function PanelMiddle() {
	const [playArea, setPlayArea] = useState<"video" | "options" | "license">("video");
	return (
		<div class="panel-middle">
			<div class="middle-tabs">
				<button class="tab" onClick={() => setPlayArea("video")}>
					Game
				</button>
				<button class="tab" onClick={() => setPlayArea("options")}>
					Options
				</button>
				<button class="tab" onClick={() => setPlayArea("license")}>
					License(s)
				</button>
			</div>
			{playArea == "video" && <EmulatorVideo />}
			{playArea == "options" && <div class="config-panel">
				Options will be added at a later date.
				<pre>{JSON.stringify(playerStatsSignal, null, 2)}</pre>
				</div>}
			{playArea == "license" && <Legal />}
		</div>
	);
}

