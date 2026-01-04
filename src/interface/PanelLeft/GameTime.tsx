import { propertySignal } from "../../functions/propertySignal";

function padNumber(number: Number|undefined) {
	return (number ?? 0).toFixed(0).padStart(2, "0");
}

const hours = propertySignal("game_time.hours", padNumber);
const minutes = propertySignal("game_time.minutes", padNumber);
const seconds = propertySignal("game_time.seconds", padNumber);
// const frames = propertySignal<number, string>("game_time.frames", x => padNumber(((x??1)/60*100)) );

export function GameTime() {
	return (
		<span class="game-time">
			{hours}:{minutes}:{seconds}
		</span>
	)
}
