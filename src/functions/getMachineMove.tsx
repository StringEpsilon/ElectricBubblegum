import { MoveLookup, MachineMoveMap } from "../components/DexContext";
import { PokemonGeneration, PokemonMove } from "../data/DataTypes";
import { getPropertyInvariant } from "../functions/getPropertyInvariant";

export function getMachineMove(
	moveName: string,
	generation: PokemonGeneration,
	moves: MoveLookup,
	mappings: MachineMoveMap
): PokemonMove | null {
	moveName = moveName.toLowerCase();
	var [machine] = Object.entries(mappings[generation])
		.find(([_, value]) => value.toLowerCase() == moveName)
		?? [null];

	if (machine) {
		var move = getPropertyInvariant(moves[generation], moveName);
		return move ? { ...move, source: machine } : null;
	}
	return null;
}
