import { propertySignal } from "../../functions/propertySignal";

function padNumber(number: Number|undefined) {
	return (number ?? 0).toFixed(0).padStart(2, "0");
}

const gameTime = {
	hours: propertySignal("game_time.hours", padNumber),
	minutes: propertySignal("game_time.minutes", padNumber),
	seconds: propertySignal("game_time.seconds", padNumber),
}
// const frames = propertySignal<number, string>("game_time.frames", x => padNumber(((x??1)/60*100)) );

export function GameTime() {
	return (
		<span class="game-time">
			{gameTime.hours}:{gameTime.minutes}:{gameTime.seconds}
		</span>
	)
}
