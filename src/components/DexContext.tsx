import { PokemonGame, PokemonGeneration, PokemonMove, PokemonSpecies } from "../data/DataTypes";
import { createContext } from "preact";
import { effect, signal } from "@preact/signals";
import { gameSignal } from "./GameContext";

type PokeDex = Record<string, PokemonSpecies>;
export type MoveLookup = Record<string, Record<string, PokemonMove>>;
export type MachineMoveMap = Record<PokemonGeneration, Record<string, string>>;
export interface PokedexContextData {
	pokedex: PokeDex,
	machineMoveMap: MachineMoveMap,
	moves: MoveLookup
}

/**
 * Context holding the advanced mode state.
 */
export const dataSignal = createContext<PokedexContextData>(null!);
export const dexContextSignal = signal<PokedexContextData>(null!);

const loadDex = async(game: PokemonGame) => {
	switch (game) {
		case "Yellow":
			// @ts-expect-error
			return await import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/pokedex/yellow.js");
			break;
		case "Crystal":
			// @ts-expect-error
			return await import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/pokedex/crystal.js");
			break;
		case "Emerald":
			// @ts-expect-error
			return await import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/pokedex/emerald.js");
			break;
		case "FireRed and LeafGreen":
			// @ts-expect-error
			return await import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/pokedex/firered_leafgreen.js");
			break;
		case "Platinum":
			// @ts-expect-error
			return await import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/pokedex/platinum.js");
			break;
		case "HeartGold and SoulSilver":
			// @ts-expect-error
			return await import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/pokedex/heartgold_soulsilver.js");
			break;
	}
}

async function loadAllData(game: PokemonGame) {
	return {
		pokedex: (await loadDex(game)).pokedex,
		// @ts-expect-error
		machineMoveMap: (await import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/tmhm.js")).tmhm,
		// @ts-expect-error
		moves: (await import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/moves.js")).moves,
	};
}

effect(() => {
	var game = gameSignal.value.name;
	loadAllData(game).then(x => dexContextSignal.value = x) 
});