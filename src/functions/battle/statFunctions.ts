import { CurrentPokemon } from "../../data/CurrentPokemon";
import { PokemonGeneration } from "../../data/DataTypes";

export type PartyStats = {
	speed: number,
	attack: number,
	defense: number,
	specialAttack: number,
	specialDefense: number,
}
export function applyItemStatModifier(heldItem: string, stats: PartyStats|null):PartyStats|null {
	if (!stats) {
		return stats;
	}
	stats = structuredClone(stats);
	switch (heldItem) {
		case "Macho Brace":
			stats.speed = Math.floor(stats.speed*0.5);
			break;
		case "Choice Band":
			stats.attack = Math.floor(stats.attack*1.5);
			break;
		case "Choice Scarf":
			stats.speed = Math.floor(stats.speed*1.5);
			break;
		case "Choice Specs":
			stats.specialAttack = Math.floor(stats.specialAttack*1.5);
			break;
		case "Thick Club": //  Cubone or Marowak 
		case "DeepSeaTooth": //  Clamperl
		case "Deep Sea Scale": //  Clamperl
		case "Light Ball": //  Pikachu
		case "Metal Powder": //  Ditto
		case "Soul Dew": //  Latias, Latios
		case "Wide Lens": //  boosts Accuracy?!
			break;
	}	
	return stats;
}

export  function stageModifier(value: number, modifier: number|null ) {
	if (modifier === null) {
		return value;
	}
	if (modifier > 0) {
		return Number(value) * (2 + Number(modifier)) / 2
	}
	if (modifier < 0) {
		Math.floor(Number(value) * (2 / (2 + (Math.abs(modifier)))));
	}
	return value;
}

export  function applyStageModifiers(currentMon: CurrentPokemon | null, generation: PokemonGeneration): PartyStats | null {
	if (!currentMon || generation === "1" ) {
		return currentMon;
	}
	return {
		speed: stageModifier(currentMon.speed, currentMon.speedMod),
		attack: stageModifier(currentMon.attack, currentMon.attackMod),
		defense: stageModifier(currentMon.defense, currentMon.defenseMod),
		specialAttack: stageModifier(currentMon.specialAttack, currentMon.specialAttackMod),
		specialDefense: stageModifier(currentMon.specialDefense, currentMon.specialDefenseMod),
	}
}

export function applyBadgeBoosts(stats: PartyStats | null, badges: any, generation: PokemonGeneration): PartyStats|null {
	if (!stats) {
		return null;
	}
	stats = structuredClone(stats);
	const factor = badgeBoostFactor[generation];
	for(let i = 0; i < 8; i++) {
		const stat = badges[i] ? badgeBoosts[generation][i] : null;
		switch (stat) {
			case "attack":
				stats.attack = Math.floor(stats.attack * factor);
				break;
			case "defense":
				stats.defense = Math.floor(stats.defense * factor);
				break;
			case "special":
				stats.specialAttack = Math.floor(stats.specialAttack * factor);
				stats.specialDefense = Math.floor(stats.specialDefense * factor);
				break;
			case "speed":
				stats.speed = Math.floor(stats.speed * factor);
				break;
		}
	}
	return stats;
}
const badgeBoostFactor: Record<PokemonGeneration, number> = {
	"1": 1.125,
	"2": 1.125,
	"3": 1.1,
	"4": 1,
};
const badgeBoosts: Record<PokemonGeneration, Record<number, "attack"|"defense"|"special"|"speed">> = {
	"1": {
		0: "attack", // boulder
		2: "defense", // thunder
		4: "speed", // sould
		6: "special", // volcano
	},
	"2": {
		0: "attack", // zephyer
		2: "speed", // plain
		5: "defense", // mineral
		6: "special", // glacier
	},
	"3": {
		0: "attack", // stone
		2: "speed", // dynamo
		4: "defense", // dynamo
		6: "special", // dynamo
	},
	"4": {},
}