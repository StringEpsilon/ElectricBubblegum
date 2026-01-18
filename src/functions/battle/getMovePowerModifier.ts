import { gameSignal } from "../../components/GameContext";
import { PokemonGeneration, PokemonMove, PokemonSpecies, PokemonType } from "../../data/DataTypes";
import typeEffectiveness from "../../data/type-effectiveness";

export function getSTAB(attacker: PokemonSpecies|null|undefined, move: PokemonMove) {
	if (!attacker) {
		return false;
	}
	return move.type === attacker.type_1 || move.type === attacker.type_2
}

export type MoveEffectiveness = {
	/** Total effective base power, including STAB. */
	power: number|null,
	/** Type effectiveness modifier, without STAB bonus. */
	modifier: number,
	isFixed: boolean,
	isSTAB: boolean,
}

export function getMovePowerModifier(
	attacker: PokemonSpecies|null|undefined,
	attackerItem: string, 
	defender: PokemonSpecies|null|undefined, 
	move: PokemonMove,
	generation: PokemonGeneration,
	weather: string,
	badges: boolean[]
) {
	const effectiveness: MoveEffectiveness = {
		isSTAB: move.power !== null && getSTAB(attacker, move),
		isFixed: move.effect === "fixed_damage",
		power: move.power,
		modifier: 1,
	}
	if (!attacker || !effectiveness.power || !effectiveness.power) {
		return effectiveness;
	}
	const typeMatchup = typeEffectiveness.find(x => x.moveType == move.type);
	if (typeMatchup && defender) {
		effectiveness.modifier *= typeMatchup[defender.type_1];
		if (defender.type_1 != defender.type_2) {
			effectiveness.modifier *= typeMatchup[defender.type_2];
		}
	}
	effectiveness.power = Math.floor(effectiveness.modifier * effectiveness.power);
	if (effectiveness.isSTAB) {
		effectiveness.power = Math.floor(effectiveness.power * 1.5);
	}
	effectiveness.power = Math.floor(effectiveness.power * getWeatherBonus(move, weather, generation));
	effectiveness.power = Math.floor(effectiveness.power * getItemTypeBonus(move, attackerItem));
	effectiveness.power = Math.floor(effectiveness.power * getBadgeBonus(move, badges, generation));
	return effectiveness;
}

const itemTypeBonus: Record<string, PokemonType> = {
	"Black Belt": "Fighting",
	"BlackGlasses": "Dark",
	"Charcoal": "Fire",
	"Dragon Fang": "Dragon",
	"Hard Stone": "Rock",
	"Magnet": "Electric",
	"Metal Coat": "Steel",
	"Miracle Seed": "Grass",
	"Mystic Water": "Water",
	"Wave Incense": "Water",
	"NeverMeltIce": "Ice",
	"Pink Bow": "Normal",
	"Poison Barb": "Poison",
	"Polkadot Bow": "Normal",
	"Sharp Beak": "Flying",
	"SilverPowder": "Bug",
	"Skilk Scarf": "Normal",
	"Soft Sand": "Ground",
	"Spell Tag": "Ghost",
	"Twisted Spoon": "Psychic",
	"TwistedSpoon": "Psychic",
	"Flame Plate": "Fire",
	"Splash Plate": "Water",
	"Zap Plate": "Electric",
	"Meadow Plate": "Grass",
	"Icicle Plate": "Ice",
	"Fist Plate": "Fighting",
	"Toxic Plate": "Poison",
	"Earth Plate": "Ground",
	"Sky Plate": "Flying",
	"Mind Plate": "Psychic",
	"Insect Plate": "Bug",
	"Stone Plate": "Rock",
	"Spooky Plate": "Ghost",
	"Draco Plate": "Dragon",
	"Dread Plate": "Dark",
	"Iron Plate": "Steel",
	"Pixie Plate": "Fairy",
};

function getItemTypeBonus(move: PokemonMove, heldItem: string) {
	const generation = gameSignal.peek().generation;
	const bonusFactor = generation == "4"
		? 1.2
		: 1.1;
	if (itemTypeBonus[heldItem] === move.type) {
		return bonusFactor;
	}
	if (generation == "2" && move.type === "Dragon" && heldItem === "Dragon Scale") {
		return 1.1;
	}
	if (heldItem === "Muscle Band" && move.category === "Physical") {
		return 1.1;
	}
	if (heldItem === "Wise Glasses" && move.category === "Special") {
		return 1.1;
	}
	return 1;
}

function getWeatherBonus(move: PokemonMove, weather: string, generation: PokemonGeneration) {
	switch (weather) {
		case "Rain":
			if (move.type === "Water") {
				return 1.5
			}
			if (move.type === "Fire") {
				return 0.5
			}
			if (move.move === "Solar Beam") {
				return 0.5;
			}
			break;
		case "Sun":
			if (move.type === "Water") {
				return 0.5
			}
			if (move.type === "Fire") {
				return 1.5
			}
			break;
		case "Sandstorm":
		case "Hail":
		case "Fog":
			if (Number(generation) >= 3 &&  move.move === "Solar Beam") {
				return 0.5;
			}
			break;
	}
	return 1;
}

function getBadgeBonus(move: PokemonMove, badges: boolean[], generation: PokemonGeneration) {
	// Johto:
	if (badges.length < 16 || generation !== "2") {
		return 1;
	}
	if (badges[0] && move.type === "Flying" ) {
		return 1.125
	}
	if (badges[1] && move.type === "Bug" ) {
		return 1.125
	}
	if (badges[2] && move.type === "Normal" ) {
		return 1.125
	}
	if (badges[3] && move.type === "Ghost" ) {
		return 1.125
	}
	if (badges[4] && move.type === "Fighting" ) {
		return 1.125
	}
	if (badges[5] && move.type === "Steel" ) {
		return 1.125
	}
	if (badges[6] && move.type === "Ice" ) {
		return 1.125
	}
	if (badges[7] && move.type === "Dragon" ) {
		return 1.125
	}
	// Kanto:
	if (badges[0] && move.type === "Rock" ) {
		return 1.125
	}
	if (badges[1] && move.type === "Water" ) {
		return 1.125
	}
	if (badges[2] && move.type === "Electric" ) {
		return 1.125
	}
	if (badges[3] && move.type === "Grass" ) {
		return 1.125
	}
	if (badges[4] && move.type === "Poison" ) {
		return 1.125
	}
	if (badges[5] && move.type === "Psychic" ) {
		return 1.125
	}
	if (badges[6] && move.type === "Fire" ) {
		return 1.125
	}
	if (badges[7] && move.type === "Ground" ) {
		return 1.125
	}
	return 1;
}