import { useState } from "preact/hooks";
import { usePropertyMap } from "../../hooks/useGameProperty";
import { gameContext } from "../../components/GameContext";
import { PokemonGeneration } from "../../data/DataTypes";
import { useLiveSignal } from "@preact/signals/utils";

type TimeMap = {
	hours: number
	minutes: number
	seconds: number
}

function createTimeMap(generation: PokemonGeneration) {
	const basePath = Number(generation) <= 2 ? "gameTime" : "game_time";
	return {
		hours: `${basePath}.hours`,
		minutes: `${basePath}.minutes`,
		seconds: `${basePath}.seconds`,
	}
}

function padNumber(number: Number) {
	return (number ?? 0).toString().padStart(2, "0");
}

export function GameTime() {
	const { generation } = gameContext.value;
	const [map] = useState(createTimeMap(generation));
	const time = usePropertyMap<TimeMap>(map);
	if (time == null) {
		return "--:--:--"
	}
	const {hours, minutes, seconds} = time;
	return (
		<span class="game-time">
			{padNumber(hours)}:{padNumber(minutes)}:{padNumber(seconds)}
		</span>
	)
}
