import { PokemonGeneration } from "../../data/DataTypes";
import { PropertyMap } from "../../hooks/useGameProperty";
import { CurrentPokemon } from "../../data/CurrentPokemon";
import { gen1_getPartyPokemonPaths } from "./gen1_getPartyPokemonPaths";
import { gen2_getPartyPokemonPaths } from "./gen2_getPartyPokemonPaths";
import { gen4_getPartyPokemonPaths } from "./gen4_getPartyPokemonPaths";
import { PartyPaths } from "./PartyPaths";

export function getPartyPokemonMap(
	generation: PokemonGeneration,
	inBattle: boolean,
	position: number
): PropertyMap<CurrentPokemon> {
	let paths: PartyPaths;
	switch (generation) {
		case "1": paths = gen1_getPartyPokemonPaths(inBattle, position); break;
		case "2": paths = gen2_getPartyPokemonPaths(inBattle, position); break;
		case "3": paths = gen2_getPartyPokemonPaths(inBattle, position); break;
		case "4": paths = gen4_getPartyPokemonPaths(inBattle, position); break;
		default: throw new Error("Unsupported generation");
	}
	return {
		species: paths.species,
		xp: paths.xp,
		level: paths.level,
		hp: paths.hp,
		maxHp: paths.maxHp,

		attack: paths.attack,
		defense: paths.defense,
		speed: paths.speed,
		specialAttack: paths.specialAttack,
		specialDefense: paths.specialDefense,

		attackMod: paths.attackMod,
		defenseMod: paths.defenseMod,
		speedMod: paths.speedMod,
		specialAttackMod: paths.specialAttackMod,
		specialDefenseMod: paths.specialDefenseMod,

		statusCondition: paths.statusCondition,

		heldItem: paths.heldItem,
		ability: paths.ability,

		move1: paths.moves[0].name,
		move1pp: paths.moves[0].pp,
		move2: paths.moves[1].name,
		move2pp: paths.moves[1].pp,
		move3: paths.moves[2].name,
		move3pp: paths.moves[2].pp,
		move4: paths.moves[3].name,
		move4pp: paths.moves[3].pp,
	}
}

