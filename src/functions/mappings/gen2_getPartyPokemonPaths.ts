import { PartyPaths } from "./PartyPaths";

export function gen2_getPartyPokemonPaths(inBattle: boolean, position: number): PartyPaths {
	if (inBattle) {
		return {
			species: "battle.active_pokemon.species",
			xp: `player.team.${position}.expPoints`,
			level: "battle.active_pokemon.level",
			hp: "battle.active_pokemon.hp",
			maxHp: "battle.active_pokemon.maxHp",
			attack: "player.active_pokemon.stats.attack",
			defense: "player.active_pokemon.stats.defense",
			speed: "player.active_pokemon.stats.speed",
			specialAttack: "player.active_pokemon.stats.special_attack",
			specialDefense: "player.active_pokemon.stats.special_defense",
			attackMod: "player.active_pokemon.modifiers.attack",
			defenseMod: "player.active_pokemon.modifiers.defense",
			speedMod: "player.active_pokemon.modifiers.speed",
			specialAttackMod: "player.active_pokemon.modifiers.special_attack",
			specialDefenseMod: "player.active_pokemon.modifiers.special_defense",
			statusCondition: "player.active_pokemon.status_condition",
			heldItem: `player.team.${position}.held_item`,
			ability: ``,
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
		xp: `player.team.${position}.expPoints`,
		level: `player.team.${position}.level`,
		hp: `player.team.${position}.stats.hp`,
		maxHp: `player.team.${position}.stats.hp_max`,
		attack: `player.team.${position}.stats.attack`,
		defense: `player.team.${position}.stats.defense`,
		speed: `player.team.${position}.stats.speed`,
		specialAttack: `player.team.${position}.stats.special_attack`,
		specialDefense: `player.team.${position}.stats.special_defense`,
		statusCondition: `player.team.${position}.statusCondition`,
		attackMod: "",
		defenseMod: "",
		speedMod: "",
		specialAttackMod: "",
		specialDefenseMod: "",
		heldItem: `player.team.${position}.held_item`,
		ability: '',
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
