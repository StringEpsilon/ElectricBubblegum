import { PartyPaths } from "./PartyPaths";

export function gen4_getPartyPokemonPaths(inBattle: boolean, position: number): PartyPaths {
	if (inBattle) {
		return {
			species: "battle.player.active_pokemon.species",
			xp: `player.team.${position}.exp`,
			level: "battle.player.active_pokemon.level",
			hp: "battle.player.active_pokemon.stats.hp",

			maxHp: "battle.player.active_pokemon.stats.hp_max",
			attack: "battle.player.active_pokemon.stats.attack",
			defense: "battle.player.active_pokemon.stats.defense",
			speed: "battle.player.active_pokemon.stats.speed",
			specialAttack: "battle.player.active_pokemon.stats.special_attack",
			specialDefense: "battle.player.active_pokemon.stats.special_defense",

			statusCondition: "", // TODO.
			attackMod: "battle.player.active_pokemon.modifiers.attack",
			defenseMod: "battle.player.active_pokemon.modifiers.defense",
			speedMod: "battle.player.active_pokemon.modifiers.speed",
			specialAttackMod: "battle.player.active_pokemon.modifiers.special_attack",
			specialDefenseMod: "battle.player.active_pokemon.modifiers.special_defense",

			heldItem: "battle.yourPokemon.heldItem",
			ability: `battle.yourPokemon.ability`,
			moves: [
				{
					name: "battle.player.active_pokemon.moves.0.move",
					pp: "battle.player.active_pokemon.moves.0.pp"
				},
				{
					name: "battle.player.active_pokemon.moves.1.move",
					pp: "battle.player.active_pokemon.moves.1.pp"
				},
				{
					name: "battle.player.active_pokemon.moves.2.move",
					pp: "battle.player.active_pokemon.moves.2.pp"
				},
				{
					name: "battle.player.active_pokemon.moves.3.move",
					pp: "battle.player.active_pokemon.moves.3.pp"
				},
			]
		};
	}
	return {
		species: `player.team.${position}.species`,
		xp: `player.team.${position}.exp`,
		level: `player.team.${position}.level`,
		hp: `player.team.${position}.stats.hp`,
		maxHp: `player.team.${position}.stats.hp_max`,
		attack: `player.team.${position}.stats.attack`,
		defense: `player.team.${position}.stats.defense`,
		speed: `player.team.${position}.stats.speed`,
		specialAttack: `player.team.${position}.stats.special_attack`,
		specialDefense: `player.team.${position}.stats.special_defense`,
		attackMod: "",
		defenseMod: "",
		speedMod: "",
		specialAttackMod: "",
		specialDefenseMod: "",

		statusCondition: "", // TODO.

		heldItem: `player.team.${position}.held_item`,
		ability: `player.team.${position}.ability`,
		moves: [
			{
				name: `player.team.${position}.moves.0.move`,
				pp: `player.team.${position}.moves.0.pp`
			},
			{
				name: `player.team.${position}.moves.1.move`,
				pp: `player.team.${position}.moves.1.pp`
			},
			{
				name: `player.team.${position}.moves.2.move`,
				pp: `player.team.${position}.moves.2.pp`
			},
			{
				name: `player.team.${position}.moves.3.move`,
				pp: `player.team.${position}.moves.3.pp`
			},
		]
	};
}
