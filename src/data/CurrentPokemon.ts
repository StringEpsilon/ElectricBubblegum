
export type CurrentPokemon = {
	species: string;
	xp: number;
	level: number;
	hp: number;

	maxHp: number;
	attack: number;
	defense: number;
	speed: number;
	specialAttack: number;
	specialDefense: number;

	attackMod: number | undefined;
	defenseMod: number | undefined;
	speedMod: number | undefined;
	specialAttackMod: number | undefined;
	specialDefenseMod: number | undefined;

	statusCondition?: string;

	heldItem: string;
	ability: boolean | string;

	move1: string;
	move1pp: number;
	move2: string;
	move2pp: number;
	move3: string;
	move3pp: number;
	move4: string;
	move4pp: number;
};
