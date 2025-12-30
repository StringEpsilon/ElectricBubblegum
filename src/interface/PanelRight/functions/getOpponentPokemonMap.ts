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
			if (!isActive) {
				return gen1_opponentPartyPokemon(index);
			}
			return gen1_opponentActivePokemon();
		case "2":
			if (!isActive) {
				return gen2_opponentPartyPokemon(index);
			}
			return gen2_opponentActivePokemon();
		case "3":
			if (!isActive) {
				return gen3_opponentPartyPokemon(index);
			}
			return gen3_opponentActivePokemon();
		case "4":
			return isActive
				? gen4_opponentActivePokemon()
				: gen4_opponentPartyPokemon(index);
	}
}
function gen1_opponentPartyPokemon(index: number): PropertyMap<OpponentPokemon> {
	return {
		species: `battle.trainer.team.${index}.species`,
		level: `battle.trainer.team.${index}.level`,
		hp: `battle.trainer.team.${index}.hp`,
		hpMax: `battle.trainer.team.${index}.maxHp`,
		attack: `battle.trainer.team.${index}.attack`,
		defense: `battle.trainer.team.${index}.defense`,
		speed: `battle.trainer.team.${index}.speed`,
		specialAttack: `battle.trainer.team.${index}.special`,
		specialDefense: `battle.trainer.team.${index}.special`,
		attackMod: "",
		defenseMod: "",
		speedMod: "",
		specialAttackMod: "",
		specialDefenseMod: "",
		move1: `battle.trainer.team.${index}.move1`,
		move2: `battle.trainer.team.${index}.move2`,
		move3: `battle.trainer.team.${index}.move3`,
		move4: `battle.trainer.team.${index}.move4`,
	};
}
function gen1_opponentActivePokemon(): PropertyMap<OpponentPokemon> {
	return {
		species: `battle.enemyPokemon.species`,
		level: `battle.enemyPokemon.level`,
		hp: `battle.enemyPokemon.hp`,
		hpMax: `battle.enemyPokemon.maxHp`,
		attack: `battle.enemyPokemon.attack`,
		defense: `battle.enemyPokemon.defense`,
		speed: `battle.enemyPokemon.speed`,
		specialAttack: `battle.enemyPokemon.special`,
		specialDefense: `battle.enemyPokemon.special`,
		attackMod: "battle.enemyPokemon.modEnemyStageAttack",
		defenseMod: "battle.enemyPokemon.modEnemyStageDefense",
		speedMod: "battle.enemyPokemon.modEnemyStageSpeed",
		specialAttackMod: "battle.enemyPokemon.modEnemyStageSpecial",
		specialDefenseMod: "battle.enemyPokemon.modEnemyStageSpecial",
		move1: `battle.enemyPokemon.move1`,
		move2: `battle.enemyPokemon.move2`,
		move3: `battle.enemyPokemon.move3`,
		move4: `battle.enemyPokemon.move4`,
	};
}
function gen2_opponentPartyPokemon(index: number): PropertyMap<OpponentPokemon> {
	return {
		species: `battle.trainer.team.${index}.species`,
		level: `battle.trainer.team.${index}.level`,
		hp: `battle.trainer.team.${index}.hp`,
		hpMax: `battle.trainer.team.${index}.maxHp`,
		attack: `battle.trainer.team.${index}.attack`,
		defense: `battle.trainer.team.${index}.defense`,
		speed: `battle.trainer.team.${index}.speed`,
		specialAttack: `battle.trainer.team.${index}.specialAttack`,
		specialDefense: `battle.trainer.team.${index}.specialDefense`,
		attackMod: "",
		defenseMod: "",
		speedMod: "",
		specialAttackMod: "",
		specialDefenseMod: "",
		move1: `battle.trainer.team.${index}.move1`,
		move2: `battle.trainer.team.${index}.move2`,
		move3: `battle.trainer.team.${index}.move3`,
		move4: `battle.trainer.team.${index}.move4`,
	};
}
function gen2_opponentActivePokemon(): PropertyMap<OpponentPokemon> {
	return {
		species: `battle.enemyPokemon.species`,
		level: `battle.enemyPokemon.level`,
		hp: `battle.enemyPokemon.hp`,
		hpMax: `battle.enemyPokemon.maxHp`,
		attack: `battle.enemyPokemon.attack`,
		defense: `battle.enemyPokemon.defense`,
		speed: `battle.enemyPokemon.speed`,
		specialAttack: `battle.enemyPokemon.specialAttack`,
		specialDefense: `battle.enemyPokemon.specialDefense`,
		attackMod: "battle.enemyPokemon.modStageAttack",
		defenseMod: "battle.enemyPokemon.modStageDefense",
		speedMod: "battle.enemyPokemon.modStageSpeed",
		specialAttackMod: "battle.enemyPokemon.modStageSpecialAttack",
		specialDefenseMod: "battle.enemyPokemon.modStageSpecialDefense",
		move1: `battle.enemyPokemon.move1`,
		move2: `battle.enemyPokemon.move2`,
		move3: `battle.enemyPokemon.move3`,
		move4: `battle.enemyPokemon.move4`,
	};
}
function gen3_opponentPartyPokemon(index: number): PropertyMap<OpponentPokemon> {
	return {
		species: `battle.trainer.team.${index}.species`,
		level: `battle.trainer.team.${index}.level`,
		hp: `battle.trainer.team.${index}.hp`,
		hpMax: `battle.trainer.team.${index}.maxHp`,
		attack: `battle.trainer.team.${index}.attack`,
		defense: `battle.trainer.team.${index}.defense`,
		speed: `battle.trainer.team.${index}.speed`,
		specialAttack: `battle.trainer.team.${index}.specialAttack`,
		specialDefense: `battle.trainer.team.${index}.specialDefense`,
		attackMod: "",
		defenseMod: "",
		speedMod: "",
		specialAttackMod: "",
		specialDefenseMod: "",
		move1: `battle.trainer.team.${index}.move1`,
		move2: `battle.trainer.team.${index}.move2`,
		move3: `battle.trainer.team.${index}.move3`,
		move4: `battle.trainer.team.${index}.move4`,
	};
}
function gen3_opponentActivePokemon(): PropertyMap<OpponentPokemon> {
	return {
		species: `battle.enemyPokemon.species`,
		level: `battle.enemyPokemon.level`,
		hp: `battle.enemyPokemon.hp`,
		hpMax: `battle.enemyPokemon.maxHp`,
		attack: `battle.enemyPokemon.attack`,
		defense: `battle.enemyPokemon.defense`,
		speed: `battle.enemyPokemon.speed`,
		specialAttack: `battle.enemyPokemon.specialAttack`,
		specialDefense: `battle.enemyPokemon.specialDefense`,
		attackMod: "battle.enemyPokemon.modStageAttack",
		defenseMod: "battle.enemyPokemon.modStageDefense",
		speedMod: "battle.enemyPokemon.modStageSpeed",
		specialAttackMod: "battle.enemyPokemon.modStageSpecialAttack",
		specialDefenseMod: "battle.enemyPokemon.modStageSpecialDefense",
		move1: "battle.enemyPokemon.move1",
		move2: "battle.enemyPokemon.move2",
		move3: "battle.enemyPokemon.move3",
		move4: "battle.enemyPokemon.move4",
	};
}
function gen4_opponentActivePokemon(): PropertyMap<OpponentPokemon> {
	return {
		species: `battle.opponent.active_pokemon.species`,
		level: `battle.opponent.active_pokemon.level`,
		hp: `battle.opponent.active_pokemon.stats.hp`,
		hpMax: `battle.opponent.active_pokemon.stats.hp_max`,
		attack: `battle.opponent.active_pokemon.stats.attack`,
		defense: `battle.opponent.active_pokemon.stats.defense`,
		speed: `battle.opponent.active_pokemon.stats.speed`,
		specialAttack: `battle.opponent.active_pokemon.stats.special_attack`,
		specialDefense: `battle.opponent.active_pokemon.stats.special_defense`,
		attackMod: "",
		defenseMod: "",
		speedMod: "",
		specialAttackMod: "",
		specialDefenseMod: "",
		move1: "battle.opponent.active_pokemon.moves.1.move",
		move2: "battle.opponent.active_pokemon.moves.2.move",
		move3: "battle.opponent.active_pokemon.moves.3.move",
		move4: "battle.opponent.active_pokemon.moves.4.move",
	};
}
function gen4_opponentPartyPokemon(index: number): PropertyMap<OpponentPokemon> {
	return {
		species: `battle.opponent.team.${index}.species`,
		level: `battle.opponent.team.${index}.level`,
		hp: `battle.opponent.team.${index}.stats.hp`,
		hpMax: `battle.opponent.team.${index}.stats.hp_max`,
		attack: `battle.opponent.team.${index}.stats.attack`,
		defense: `battle.opponent.team.${index}.stats.defense`,
		speed: `battle.opponent.team.${index}.stats.speed`,
		specialAttack: `battle.opponent.team.${index}.stats.special_attack`,
		specialDefense: `battle.opponent.team.${index}.stats.special_defense`,
		attackMod: "battle.opponent.active_pokemon.modifiers.attack",
		defenseMod: "battle.opponent.active_pokemon.modifiers.defense",
		speedMod: "battle.opponent.active_pokemon.modifiers.speed",
		specialAttackMod: "battle.opponent.active_pokemon.modifiers.special_attack",
		specialDefenseMod: "battle.opponent.active_pokemon.modifiers.special_defense",
		move1: `battle.opponent.team.${index}..moves.1.move`,
		move2: `battle.opponent.team.${index}..moves.2.move`,
		move3: `battle.opponent.team.${index}..moves.3.move`,
		move4: `battle.opponent.team.${index}..moves.4.move`,
	};
}
