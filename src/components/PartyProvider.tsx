import { mapPropertyObject, PropertyMap } from "../hooks/useGameProperty";
import { battleInfo } from "../interface/PanelRight/useBattleInfo";
import { getOpponentPokemonMap } from "../interface/PanelRight/functions/getOpponentPokemonMap";
import { OpponentPokemon } from "../interface/PanelRight/types/OpponentPokemon";
import { computed, effect, signal } from "@preact/signals";
import { gameSignal } from "./GameContext";
import { subscribePaths } from "../functions/subscribePaths";

export const opponentPartyMap = signal<PropertyMap<OpponentPokemon> | null>(null);

effect(() => {
	const opponentPos = computed(() => battleInfo.value.currentPokemon);
	const battleType = computed(() => battleInfo.value.type);
	if (battleType.value !== "Trainer") {
		opponentPartyMap.value = null;
		return;
	}
	opponentPartyMap.value = getOpponentPokemonMap(
		gameSignal.value.generation, 
		opponentPos.value, 
		true
	);
});

export const opponenStatsSignal = signal<OpponentPokemon | null>(null);

effect(() => {
	const map = opponentPartyMap.value;
	if (map !== null) {
		const entries: string[] = [];
		Object.getOwnPropertyNames(map).forEach((key) => {
			entries.push(map[key as keyof PropertyMap<OpponentPokemon>]);
		});
		const update =() => {
			opponenStatsSignal.value = mapPropertyObject(map)
		}
		update();
		return subscribePaths(entries, update);
	}
});

