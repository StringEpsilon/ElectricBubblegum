import { batch, effect, signal } from "@preact/signals";
import { CurrentPokemon } from "../data/CurrentPokemon";
import { gameSignal } from "./GameContext";
import { gameState } from "../data/gameState";
import { playerTeamPosition } from "../signals/playerTeamPosition";
import { getPartyPokemonMap } from "../functions/mappings/getPartyPokemonMap";
import { mapPropertyObject, PropertyMap } from "../hooks/useGameProperty";
import { subscribePaths } from "../functions/subscribePaths";

export const playerStatsSignal = signal<CurrentPokemon | null>(null);

batch(() => {
	effect(() => {
		if (gameState.value === "No Pokemon") {
			return;
		}
		const map = getPartyPokemonMap(
			gameSignal.value.generation === "1",
			gameState.value === "Battle" || gameState.value === "From Battle",
			playerTeamPosition.value
		);
		
		if (map !== null) {
			const entries: string[] = [];
			Object.getOwnPropertyNames(map).forEach((key) => {
				entries.push(map[key as keyof PropertyMap<CurrentPokemon>]);
			});
			playerStatsSignal.value = mapPropertyObject(map)
			return subscribePaths(entries, () => playerStatsSignal.value = mapPropertyObject(map));
		}
	});
});
