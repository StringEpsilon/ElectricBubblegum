import { PokemonGame, PokemonGeneration, PokemonSpecies } from "../data/DataTypes";
import { createContext } from "preact";
import { getPartyPokemonMap } from "../functions/mappings/getPartyPokemonMap";
import { CurrentPokemon } from "../data/CurrentPokemon";
import { dexContextSignal } from "./DexContext";
import { getPropertyInvariant } from "../functions/getPropertyInvariant";
import { mapPropertyObject, PropertyMap } from "../hooks/useGameProperty";
import { battleInfo } from "../interface/PanelRight/useBattleInfo";
import { getOpponentPokemonMap } from "../interface/PanelRight/functions/getOpponentPokemonMap";
import { OpponentPokemon } from "../interface/PanelRight/types/OpponentPokemon";
import { computed, effect, signal } from "@preact/signals";
import { Store } from "../PokeAByte/PropertyStore";
import { gameContext } from "./GameContext";
import { gameState, getGameState } from "../data/gameState";
import { playerPartyPosition } from "../data/playerPartyPosition";

export interface PokemonData {
	playerDexEntry: PokemonSpecies | null,
	playerCurrent: CurrentPokemon | null,
}

export const playerPartyMap = signal<PropertyMap<CurrentPokemon> | null>(null);

effect(() => {
	playerPartyMap.value = getPartyPokemonMap(
		gameContext.value.generation,
		gameState.value === "Battle",
		playerPartyPosition.value
	);
});

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

export interface OpponentData {
	dexEntry: PokemonSpecies | null,
	pokemonStats: OpponentPokemon | null,
}


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
	const map = playerPartyMap.value;
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

export const playerDexSignal = signal<PokemonSpecies | null>(null);
effect(() => {
	const pokedex = computed(() => dexContextSignal.value?.pokedex).value;
	const species = computed(() => playerStatsSignal.value?.species).value;
	if (pokedex) {
		playerDexSignal.value = getPropertyInvariant(pokedex, species ?? "");
	}
});
export const opponentDexSignal = signal<PokemonSpecies | null>(null);
effect(() => {
	const pokedex = computed(() => dexContextSignal.value?.pokedex).value;
	const opponentSpecies = computed(() => opponenStatsSignal.value?.species).value;
	if (pokedex) {
		opponentDexSignal.value = getPropertyInvariant(pokedex, opponentSpecies ?? "");
	}
});
