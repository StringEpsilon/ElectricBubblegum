import { PokemonMove, PokemonSpecies } from "../../data/DataTypes";
import typeEffectiveness from "../../data/type-effectiveness";

export function getSTAB(attacker: PokemonSpecies|null|undefined, move: PokemonMove) {
	if (!attacker) {
		return false;
	}
	return move.type === attacker.type_1 || move.type === attacker.type_2
}

export type MoveEffectiveness = {
	/** Total effective base power, including STAB. */
	power: number|null,
	/** Type effectiveness modifier, without STAB bonus. */
	modifier: number,
	isFixed: boolean,
	isSTAB: boolean,
}

export function getMovePowerModifier(
	attacker: PokemonSpecies|null|undefined, 
	defender: PokemonSpecies|null|undefined, 
	move: PokemonMove
) {
	const effectiveness: MoveEffectiveness = {
		isSTAB: move.power !== null && getSTAB(attacker, move),
		isFixed: move.effect === "fixed_damage",
		power: move.power,
		modifier: 1,
	}
	if (!attacker || !defender || !effectiveness.power || !effectiveness.power) {
		return effectiveness;
	}
	const typeMatchup = typeEffectiveness.find(x => x.moveType == move.type);
	if (typeMatchup) {
		effectiveness.modifier *= typeMatchup[defender.type_1];
		if (defender.type_1 != defender.type_2) {
			effectiveness.modifier *= typeMatchup[defender.type_2];
		}
	}
	effectiveness.power *= effectiveness.modifier;
	if (effectiveness.isSTAB) {
		effectiveness.power *= 1.5
	}
	effectiveness.power = Math.floor(effectiveness.power);
	return effectiveness;
}