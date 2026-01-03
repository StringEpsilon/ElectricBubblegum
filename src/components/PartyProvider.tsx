import { mapPropertyObject, PropertyMap } from "../hooks/useGameProperty";
import { battleInfo } from "../interface/PanelRight/useBattleInfo";
import { getOpponentPokemonMap } from "../interface/PanelRight/functions/getOpponentPokemonMap";
import { OpponentPokemon } from "../interface/PanelRight/types/OpponentPokemon";
import { computed, effect, signal } from "@preact/signals";
import { gameSignal } from "./GameContext";
import { gameState, getGameState } from "../data/gameState";
import { subscribePaths } from "../functions/subscribePaths";

export const opponentPartyMap = signal<PropertyMap<OpponentPokemon> | null>(null);

effect(() => {
	const opponentPos = computed(() => battleInfo.value.currentPokemon);
	opponentPartyMap.value = getOpponentPokemonMap(gameSignal.value.generation, opponentPos.value, true)
});
subscribePaths(["meta.state"], () => gameState.value = getGameState());

export const opponenStatsSignal = signal<OpponentPokemon | null>(null);
effect(() => {
	const map = opponentPartyMap.value;
	if (map !== null) {
		const entries: string[] = [];
		Object.getOwnPropertyNames(map).forEach((key) => {
			entries.push(map[key as keyof PropertyMap<OpponentPokemon>]);
		});
		return subscribePaths(entries, () => opponenStatsSignal.value = mapPropertyObject(map));
	}
});

