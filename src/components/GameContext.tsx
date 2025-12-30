import { Mapper } from "pokeaclient";
import { PokemonGame, PokemonGeneration } from "../data/DataTypes";
import { createContext } from "preact";

export interface GameContextData {
	game: PokemonGame,
	generation: PokemonGeneration,
	mapper: Mapper,
}

/**
 * Context holding the advanced mode state.
 */
export const GameContext = createContext<GameContextData>(null!);