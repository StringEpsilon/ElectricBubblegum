
export type CurrentPokemon = {
	species: string;
	nickname: string;
	xp: number;
	level: number;
	hp: number;

	maxHp: number;
	attack: number;
	defense: number;
	speed: number;
	specialAttack: number;
	specialDefense: number;

	attackMod: number | null;
	defenseMod: number | null;
	speedMod: number | null;
	specialAttackMod: number | null;
	specialDefenseMod: number | null;

	statusCondition?: string;

	heldItem: string;
	ability: boolean | string;

	move1: string | null;
	move1pp: number;
	move2: string | null;
	move2pp: number;
	move3: string | null;
	move3pp: number;
	move4: string | null;
	move4pp: number;
};
