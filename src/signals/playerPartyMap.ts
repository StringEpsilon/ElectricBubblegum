import { effect, signal } from "@preact/signals";
import { PropertyMap } from "../hooks/useGameProperty";
import { CurrentPokemon } from "../data/CurrentPokemon";
import { getPartyPokemonMap } from "../functions/mappings/getPartyPokemonMap";
import { gameState } from "../data/gameState";
import { playerTeamPosition } from "./playerTeamPosition";

export const playerTeamMap = signal<PropertyMap<CurrentPokemon> | null>(null);

effect(() => {
	playerTeamMap.value = getPartyPokemonMap(
		gameState.value === "Battle",
		playerTeamPosition.value
	);
});
