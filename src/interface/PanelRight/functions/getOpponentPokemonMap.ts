import { PokemonGeneration } from "../../../data/DataTypes";
import { PropertyMap } from "../../../hooks/useGameProperty";
import { OpponentPokemon } from "../types/OpponentPokemon";

export function getOpponentPokemonMap(
	generation: PokemonGeneration, 
	index: number, 
	isActive: boolean
): PropertyMap<OpponentPokemon> {
	switch (generation) {
		case "1":
		case "2":
		case "4":
			return isActive
				? gen1_2_4opponentActivePokemon(index)
				: gen1_2_4opponentPartyPokemon(index);
		case "3":
			if (!isActive) {
				return gen1_2_4opponentPartyPokemon(index);
			}
			return gen1_2_4opponentActivePokemon(index);
	}
}
function gen1_2_4opponentPartyPokemon(index: number): PropertyMap<OpponentPokemon> {
	return {
		species: `battle.opponent.team.${index}.species`,
		level: `battle.opponent.team.${index}.level`,
		hp: `battle.opponent.team.${index}.stats.hp`,
		maxHp: `battle.opponent.team.${index}.stats.hp_max`,
		type_1: ``,
		type_2: ``,
		ability: `battle.opponent.team.${index}.stats.ability`,
		heldItem: `battle.opponent.team.${index}.stats.held_item`,
		friendship: `battle.opponent.team.${index}.stats.friendship`,
		attack: `battle.opponent.team.${index}.stats.attack`,
		defense: `battle.opponent.team.${index}.stats.defense`,
		speed: `battle.opponent.team.${index}.stats.speed`,
		specialAttack: `battle.opponent.team.${index}.stats.special_attack`,
		specialDefense: `battle.opponent.team.${index}.stats.special_defense`,
		attackMod: "",
		defenseMod: "",
		speedMod: "",
		specialAttackMod: "",
		specialDefenseMod: "",
		move1: `battle.opponent.team.${index}.moves.0.move`,
		move2: `battle.opponent.team.${index}.moves.1.move`,
		move3: `battle.opponent.team.${index}.moves.2.move`,
		move4: `battle.opponent.team.${index}.moves.3.move`,
	};
}
function gen1_2_4opponentActivePokemon(index: number): PropertyMap<OpponentPokemon> {
	return {
		species: `battle.opponent.active_pokemon.species`,
		level: `battle.opponent.team.${index}.level`,
		hp: `battle.opponent.active_pokemon.stats.hp`,
		type_1: `battle.opponent.active_pokemon.type_1`,
		type_2: `battle.opponent.active_pokemon.type_2`,
		ability: `battle.opponent.team.${index}.stats.ability`,
		heldItem: `battle.opponent.active_pokemon.held_item`,
		friendship: `battle.opponent.team.${index}.stats.friendship`,
		maxHp: `battle.opponent.team.${index}.stats.hp_max`,
		attack: `battle.opponent.active_pokemon.stats.attack`,
		defense: `battle.opponent.active_pokemon.stats.defense`,
		speed: `battle.opponent.active_pokemon.stats.speed`,
		specialAttack: `battle.opponent.active_pokemon.stats.special_attack`,
		specialDefense: `battle.opponent.active_pokemon.stats.special_defense`,
		attackMod: "battle.opponent.active_pokemon.modifiers.attack",
		defenseMod: "battle.opponent.active_pokemon.modifiers.defense",
		speedMod: "battle.opponent.active_pokemon.modifiers.speed",
		specialAttackMod: "battle.opponent.active_pokemon.modifiers.special_attack",
		specialDefenseMod: "battle.opponent.active_pokemon.modifiers.special_defense",
		move1: `battle.opponent.active_pokemon.moves.0.move`,
		move2: `battle.opponent.active_pokemon.moves.1.move`,
		move3: `battle.opponent.active_pokemon.moves.2.move`,
		move4: `battle.opponent.active_pokemon.moves.3.move`,
	};
}
