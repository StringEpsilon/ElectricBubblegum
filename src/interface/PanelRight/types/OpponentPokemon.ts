import { PokemonType } from "../../../data/DataTypes";

export type OpponentPokemon = {
	species: string;
	friendship: number, 
	level: number;
	hp: number;
	maxHp: number;
	heldItem: string;
	ability: string;
	type_1: PokemonType, 
	type_2: PokemonType,
	attack: number;
	defense: number;
	speed: number;
	specialAttack: number;
	specialDefense: number;
	attackMod: number;
	defenseMod: number;
	speedMod: number;
	specialAttackMod: number;
	specialDefenseMod: number;
	move1: string | null;
	move2: string | null;
	move3: string | null;
	move4: string | null;
};
