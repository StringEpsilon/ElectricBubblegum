import { PokemonGame, PokemonGeneration } from "../data/DataTypes";
import { createContext } from "preact";
import { signal } from "@preact/signals";

export interface GameContextData {
	game: PokemonGame,
	generation: PokemonGeneration,
}

export const gameContext = signal<GameContextData>({
	game: "Yellow",
	generation: "1",
});


/**
 * Context holding the advanced mode state.
 */
export const GameContext = createContext<GameContextData>(null!);