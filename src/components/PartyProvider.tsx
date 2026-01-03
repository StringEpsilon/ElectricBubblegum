import { mapPropertyObject, PropertyMap } from "../hooks/useGameProperty";
import { battleInfo } from "../interface/PanelRight/useBattleInfo";
import { getOpponentPokemonMap } from "../interface/PanelRight/functions/getOpponentPokemonMap";
import { OpponentPokemon } from "../interface/PanelRight/types/OpponentPokemon";
import { computed, effect, signal } from "@preact/signals";
import { Store } from "../PokeAByte/PropertyStore";
import { gameContext } from "./GameContext";
import { gameState, getGameState } from "../data/gameState";
import { playerTeamMap } from "../signals/playerPartyMap";
import { CurrentPokemon } from "../data/CurrentPokemon";

export const opponentPartyMap = signal<PropertyMap<OpponentPokemon> | null>(null);

effect(() => {
	const opponentPos = computed(() => battleInfo.value.currentPokemon);
	opponentPartyMap.value = getOpponentPokemonMap(gameContext.value.generation, opponentPos.value, true)
});

Store.addUpdateListener((path) => {
	if (path === "meta.state") {
		gameState.value = getGameState();
	}
});

export const opponenStatsSignal = signal<OpponentPokemon | null>(null);
effect(() => {
	const map = opponentPartyMap.value;
	if (map !== null) {
		const entries: string[] = [];
		Object.getOwnPropertyNames(map).forEach((key) => {
			entries.push(map[key as keyof PropertyMap<OpponentPokemon>]);
		});
		Store.addUpdateListener(path => {
			if (entries.includes(path)) {
				opponenStatsSignal.value = mapPropertyObject(map)
			}
		});
	}
});

export const playerStatsSignal = signal<CurrentPokemon | null>(null);
effect(() => {
	const map = playerTeamMap.value;
	if (map !== null) {
		const entries: string[] = [];
		Object.getOwnPropertyNames(map).forEach((key) => {
			entries.push(map[key as keyof PropertyMap<CurrentPokemon>]);
		});
		Store.addUpdateListener(path => {
			if (entries.includes(path)) {
				playerStatsSignal.value = mapPropertyObject(map)
			}
		});
	}
});

