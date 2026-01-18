import { BattlePokemon } from "../../data/CurrentPokemon";
import { PokemonGeneration, PokemonMove, PokemonType } from "../../data/DataTypes";
import typeEffectiveness from "../../data/type-effectiveness";

export function getSTAB(attacker: BattlePokemon | null, move: PokemonMove) {
	if (!attacker) {
		return false;
	}
	return move.type === attacker.type_1
		|| move.type === attacker.type_2;
}

export type MoveEffectiveness = {
	/** Total effective base power, including STAB. */
	power: number | null,
	/** Type effectiveness modifier, without STAB and other bonuses. */
	typeBonus: number,
	isFixed: boolean,
	isSTAB: boolean,
}

export function getMovePowerModifier(
	attacker: BattlePokemon | null,
	defender: BattlePokemon | null,
	move: PokemonMove,
	generation: PokemonGeneration,
	weather: string,
	badges: boolean[]
) {
	const effectiveness: MoveEffectiveness = {
		isSTAB: move.power !== null && getSTAB(attacker, move),
		isFixed: move.effect === "fixed_damage",
		power: move.power,
		typeBonus: 1,
	}
	if (!attacker || !effectiveness.power || !effectiveness.power) {
		return effectiveness;
	}
	if (move.move === "Return") {
		effectiveness.power = attacker.friendship / 2.5;
		if (generation !== "2") {
			effectiveness.power = Math.max(1, effectiveness.power);
		}
	}
	if (move.move === "Frustration") {
		effectiveness.power = (255 - attacker.friendship) / 2.5;
		if (generation !== "2") {
			effectiveness.power = Math.max(1, effectiveness.power);
		}
	}
	const typeMatchup = typeEffectiveness.find(x => x.moveType == move.type);
	if (typeMatchup && defender) {
		effectiveness.typeBonus *= typeMatchup[defender.type_1];
		if (defender.type_1 != defender.type_2) {
			effectiveness.typeBonus *= typeMatchup[defender.type_2];
		}
	}
	effectiveness.power *= effectiveness.typeBonus;
	if (effectiveness.isSTAB) {
		if (attacker.ability === "Adaptability") {
			effectiveness.power *= 2;
		} else {
			effectiveness.power *= 1.5;
		}
	}
	effectiveness.power *= getWeatherBonus(move, weather, generation);
	effectiveness.power *= getItemTypeBonus(move, attacker, generation);
	effectiveness.power *= getBadgeBonus(move, badges, generation);
	if (attacker.ability !== "Mold Breaker") {
		effectiveness.power *= getDefenderAbilityModifier(move, defender, effectiveness.typeBonus, generation);
	}
	effectiveness.power *= getAttackerAbilityModifier(move, attacker, effectiveness.typeBonus, generation);
	effectiveness.power = Math.floor(effectiveness.power);
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

const recklessMoves = [
	"Submission", "Take Down", "Volt Tackle", "Wood Hammer", "Brave Bird", "Double-Edge", "Flare Blitz","Head Smash",
	"Selfdestruct", "Hi Jump Kick", "Jump Kick"
]
const ironFistMoves = [
	"Bullet Punch", "Comet Punch", "Dizzy Punch", "Drain Punch", "DynamicPunch", "Fire Punch", "Focus Punch",
	"Hammer Arm", "Ice Punch", "Mach Punch", "Mega Punch", "Shadow Punch", "Sky Uppercut", "ThunderPunch"
]

function getAttackerAbilityModifier(move: PokemonMove, attacker: BattlePokemon, typeBonus: number, generation: PokemonGeneration) {
	switch (attacker.ability) {
		case "Adaptability":
			// Handled above.
			return 1;
		case "Blaze":
			return (move.type === "Fire" && attacker.stats.hp <= Math.floor(attacker.stats.maxHp/3))
				? 1.5
				: 1;
		case "Iron Fist":
			return (ironFistMoves.includes(move.move))
				? 1.2
				: 1;
		case "Normalize":
			// TODO.
			return 1;
		case "Overgrow":
			return (move.type === "Grass" && attacker.stats.hp <= Math.floor(attacker.stats.maxHp/3))
				? 1.5
				: 1;
		case "Reckless":
			return (recklessMoves.includes(move.move))
				? 1.2
				: 1;
		case "Swarm":
			return (move.type === "Bug" && attacker.stats.hp <= Math.floor(attacker.stats.maxHp/3))
				? 1.5
				: 1;
		case "Technician":
			return (move.power && move.power <= 60)
				? 1.5
				: 1;
		case "Tinted Lens":
			// TODO.
			return 1;
		case "Torrent":
			return (move.type === "Water" && attacker.stats.hp <= Math.floor(attacker.stats.maxHp/3))
				? 1.5
				: 1;
	}
	return 1;
}

const soundMoves = {
	"3": [ 
		"GrassWhistle", "Growl", "Heal Bell", "Hyper Voice", "Metal Sound", "Perish Song", "Roar", "Screech", "Sing", 
		"Snore", "Supersonic", "Uproar"
	],
	"4": [ 
		"GrassWhistle", "Growl", "Heal Bell", "Hyper Voice", "Metal Sound", "Perish Song", "Roar", "Screech", "Sing", 
		"Snore", "Supersonic", "Uproar", "Bug Buzz", "Chatter"
	]
}

function getDefenderAbilityModifier(move: PokemonMove, defender: BattlePokemon|null, typeBonus: number, generation: PokemonGeneration) {
	if (generation === "1" || generation === "2") {
		return 1;
	}
	if (!defender) {
		return 1;
	}
	const moveName = move.move;
	switch (defender.ability) {
		case "Solid Rock":
		case "Filter":
			if (typeBonus >= 2) {
				return 0.75
			}
			break;
		case "Soundproof":
			if (soundMoves[generation].includes(moveName)) {
				return 0;
			}
			break;
		case "Wonder Guard":
			if (typeBonus < 2) {
				return 0
			}
			break;
		case "Damp":
			return (moveName === "Selfdestruct" || moveName === "Explosion")
				? 0
				: 1;			
		case "Dry Skin":
			return (move.type === "Fire") 
				? 1.25 
				: 1;
		case "Levitate":
			return (move.type === "Ground") 
				? 0 
				: 1;
		case "Flash Fire":
			return (move.type === "Fire") 
				? 0 
				: 1;
		case "Water Absorb":
			return (move.type === "Water") 
				? 0 
				: 1;
		case "Motor Drive":
			return (move.type === "Electric") 
				? 0 
				: 1;
		case "Heatproof":
			return (move.type === "Fire") 
				? 0.5 
				: 1;
		case "Thick Fat":
			return ((move.type === "Fire" || move.type === "Ice")) 
				? 0.5 
				: 1;
	}
	return 1;
}

function getItemTypeBonus(move: PokemonMove, attacker: BattlePokemon, generation: PokemonGeneration) {
	const bonusFactor = generation == "4"
		? 1.2
		: 1.1;
	if (itemTypeBonus[attacker.heldItem] === move.type) {
		return bonusFactor;
	}
	if (generation == "2" && move.type === "Dragon" && attacker.heldItem === "Dragon Scale") {
		return 1.1;
	}
	if (attacker.heldItem === "Muscle Band" && move.category === "Physical") {
		return 1.1;
	}
	if (attacker.heldItem === "Wise Glasses" && move.category === "Special") {
		return 1.1;
	}
	if (attacker.heldItem === "Light Ball" && attacker.dexData.species === "Pikachu" && generation == "4") {
		return 2;
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
			if (Number(generation) >= 3 && move.move === "Solar Beam") {
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
	if (badges[0] && move.type === "Flying") {
		return 1.125
	}
	if (badges[1] && move.type === "Bug") {
		return 1.125
	}
	if (badges[2] && move.type === "Normal") {
		return 1.125
	}
	if (badges[3] && move.type === "Ghost") {
		return 1.125
	}
	if (badges[4] && move.type === "Fighting") {
		return 1.125
	}
	if (badges[5] && move.type === "Steel") {
		return 1.125
	}
	if (badges[6] && move.type === "Ice") {
		return 1.125
	}
	if (badges[7] && move.type === "Dragon") {
		return 1.125
	}
	// Kanto:
	if (badges[0] && move.type === "Rock") {
		return 1.125
	}
	if (badges[1] && move.type === "Water") {
		return 1.125
	}
	if (badges[2] && move.type === "Electric") {
		return 1.125
	}
	if (badges[3] && move.type === "Grass") {
		return 1.125
	}
	if (badges[4] && move.type === "Poison") {
		return 1.125
	}
	if (badges[5] && move.type === "Psychic") {
		return 1.125
	}
	if (badges[6] && move.type === "Fire") {
		return 1.125
	}
	if (badges[7] && move.type === "Ground") {
		return 1.125
	}
	return 1;
}