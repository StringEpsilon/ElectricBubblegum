import { PokemonMove, PokemonSpecies } from "../../data/DataTypes";
import typeEffectiveness from "../../data/type-effectiveness";

export function getSTAB(attacker: PokemonSpecies|null|undefined, move: PokemonMove) {
	if (!attacker) {
		return false;
	}
	return move.type === attacker.type_1 || move.type === attacker.type_2
}

export function getMovePowerModifier(
	attacker: PokemonSpecies|null|undefined, 
	defender: PokemonSpecies|null|undefined, 
	move: PokemonMove
) {
	if (!attacker || !defender || !move.power) {
		return 1;
	}
	let modifier = 1;
	const effectiveness = typeEffectiveness.find(x => x.moveType == move.type);
	if (effectiveness) {
		modifier *= effectiveness[defender.type_1];
		if (defender.type_1 != defender.type_2) {
			modifier *= effectiveness[defender.type_2];
		}
	}
	return modifier;
}