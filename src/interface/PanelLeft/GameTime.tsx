import { createModel, signal } from "@preact/signals";
import { subscribePaths } from "../../functions/subscribePaths";
import { Store } from "../../PokeAByte/PropertyStore";

function padNumber(number: Number|undefined) {
	return (number ?? 0).toFixed(0).padStart(2, "0");
}

const TimerModel = createModel(() => {
	const hours = signal("00");
	const minutes = signal("00");
	const seconds = signal("00");
	const update = () => {
		hours.value = padNumber(Store.getProperty<number>("game_time.hours")?.value);
		minutes.value = padNumber(Store.getProperty<number>("game_time.minutes")?.value);
		seconds.value = padNumber(Store.getProperty<number>("game_time.seconds")?.value);
	}
	subscribePaths(["game_time.seconds"], update);
	return {
		hours,
		minutes,
		seconds,
	};
});

const timer = new TimerModel();

export function GameTime() {
	return (
		<span class="game-time">
			{timer.hours}:{timer.minutes}:{timer.seconds}
		</span>
	)
}
