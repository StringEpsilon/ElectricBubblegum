import { PartyPaths } from "./PartyPaths";

export function gen2_getPartyPokemonPaths(inBattle: boolean, position: number): PartyPaths {
	if (inBattle) {
		return {
			species: "battle.yourPokemon.species",
			xp: `player.team.${position}.expPoints`,
			level: "battle.yourPokemon.level",
			hp: "battle.yourPokemon.hp",
			maxHp: "battle.yourPokemon.maxHp",
			attack: "battle.yourPokemon.attack",
			defense: "battle.yourPokemon.defense",
			speed: "battle.yourPokemon.speed",
			specialAttack: "battle.yourPokemon.specialAttack",
			specialDefense: "battle.yourPokemon.specialDefense",
			attackMod: "battle.yourPokemon.modStageAttack",
			defenseMod: "battle.yourPokemon.modStageDefense",
			speedMod: "battle.yourPokemon.modStageSpeed",
			specialAttackMod: "battle.yourPokemon.modStageSpecialAttack",
			specialDefenseMod: "battle.yourPokemon.modStageSpecialDefense",
			statusCondition: "battle.yourPokemon.statusCondition",
			heldItem: "battle.yourPokemon.heldItem",
			ability: `battle.yourPokemon.ability`,
			moves: [
				{
					name: "battle.yourPokemon.move1",
					pp: "battle.yourPokemon.move1pp"
				},
				{
					name: "battle.yourPokemon.move2",
					pp: "battle.yourPokemon.move2pp"
				},
				{
					name: "battle.yourPokemon.move3",
					pp: "battle.yourPokemon.move3pp"
				},
				{
					name: "battle.yourPokemon.move4",
					pp: "battle.yourPokemon.move4pp"
				},
			]
		};
	}
	return {
		species: `player.team.${position}.species`,
		xp: `player.team.${position}.expPoints`,
		level: `player.team.${position}.level`,
		hp: `player.team.${position}.hp`,
		maxHp: `player.team.${position}.maxHp`,
		attack: `player.team.${position}.attack`,
		defense: `player.team.${position}.defense`,
		speed: `player.team.${position}.speed`,
		specialAttack: `player.team.${position}.specialAttack`,
		specialDefense: `player.team.${position}.specialDefense`,
		statusCondition: `player.team.${position}.statusCondition`,
		attackMod: "",
		defenseMod: "",
		speedMod: "",
		specialAttackMod: "",
		specialDefenseMod: "",
		heldItem: `player.team.${position}.itemHeld`,
		ability: `player.team.${position}.ability`,
		moves: [
			{
				name: `player.team.${position}.move1`,
				pp: `player.team.${position}.move1pp`
			},
			{
				name: `player.team.${position}.move2`,
				pp: `player.team.${position}.move2pp`
			},
			{
				name: `player.team.${position}.move3`,
				pp: `player.team.${position}.move3pp`
			},
			{
				name: `player.team.${position}.move4`,
				pp: `player.team.${position}.move4pp`
			},
		]
	};
}
