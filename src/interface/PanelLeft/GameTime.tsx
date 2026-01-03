import { propertySignal } from "../../functions/propertySignal";

function padNumber(number: Number|undefined) {
	return (number ?? 0).toString().padStart(2, "0");
}

const hours = propertySignal("game_time.hours", padNumber);
const minutes = propertySignal("game_time.minutes", padNumber);
const seconds = propertySignal("game_time.seconds", padNumber);

export function GameTime() {
	return (
		<span class="game-time">
			{hours}:{minutes}:{seconds}
		</span>
	)
}
