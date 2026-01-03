import { PropertyMap } from "../../hooks/useGameProperty";
import { CurrentPokemon } from "../../data/CurrentPokemon";

export function getPartyPokemonMap(
	inBattle: boolean,
	position: number
): PropertyMap<CurrentPokemon> {
	const basePath = inBattle 
		? "battle.player.active_pokemon" 
		: `player.team.${position}`;
	return {
		species: `${basePath}.species`,
		xp:`${basePath}.exp`,
		level: `${basePath}.level`,
		hp: `${basePath}.hp`,
		maxHp: `${basePath}.maxHp`,
		attack: `${basePath}.stats.attack`,
		defense: `${basePath}.stats.defense`,
		speed: `${basePath}.stats.speed`,
		specialAttack: `${basePath}.stats.special_attack`,
		specialDefense: `${basePath}.stats.special_defense`,
		heldItem: `player.team.${position}.held_item`,
		ability: `${basePath}.ability`,
		move1: `${basePath}.moves.0.move`,
		move1pp: `${basePath}.moves.0.pp`,
		move2: `${basePath}.moves.1.move`,
		move2pp: `${basePath}.moves.1.pp`,
		move3: `${basePath}.moves.2.move`,
		move3pp: `${basePath}.moves.2.pp`,
		move4: `${basePath}.moves.3.move`,
		move4pp: `${basePath}.moves.3.pp`,
		attackMod: inBattle 
			? `${basePath}.modifiers.attack` 
			: "",
		defenseMod: inBattle 
			? `${basePath}.modifiers.defense` 
			: "",
		speedMod: inBattle 
			? `${basePath}.modifiers.speed` 
			: "",
		specialAttackMod: inBattle 
			? `${basePath}.modifiers.special_attack` 
			: "",
		specialDefenseMod: inBattle 
			? `${basePath}.modifiers.special_defense` 
			: "",
		statusCondition: inBattle 
			? `${basePath}.status_condition` 
			: "",
	};
}

