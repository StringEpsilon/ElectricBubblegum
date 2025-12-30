import { MoveLookup, MachineMoveMap } from "../components/DexContext";
import { PokemonGeneration, PokemonMove, PokemonMovePool, PokemonSpecies } from "../data/DataTypes";
import { getMachineMove } from "./getMachineMove";
import { getPropertyInvariant } from "./getPropertyInvariant";

export function mapMovePool(
	species: PokemonSpecies | null,
	generation: PokemonGeneration,
	moves: MoveLookup,
	machineMoveMap: MachineMoveMap
): PokemonMovePool {
	if (!species) {
		return { level: [], tmhm: [], tutor: []};
	}
	return {
		level: species.level_up_learnset
			?.map<PokemonMove | null>(
				([level, move]) => {
					const moveData = getPropertyInvariant(moves[generation], move ?? "");
					return moveData
						? { ...moveData, source: level }
						: null;
				})
			.filter(x => x !== null),
		tmhm: species.tm_hm_learnset
			.map(move => getMachineMove(move, generation, moves, machineMoveMap))
			.filter(move => move != null),
		tutor: species.tutor_learnset
			.map<PokemonMove | null>((move) => getPropertyInvariant(moves[generation], move ?? ""))
			.filter(x => x !== null),
	}
}