import { subscribePaths } from "../../functions/subscribePaths";
import { Store } from "../../PokeAByte/PropertyStore";
import { signal } from "@preact/signals";

const defaultBattleProperties = [
	"battle.mode", 
	"battle.opponent.trainer", 
	"battle.opponent.name", 
	"battle.opponent.party_position", 
	"battle.opponent.team_count",
	"battle.opponent.id",
	"battle.opponent.team.0.species",
	"battle.opponent.team.1.species",
	"battle.opponent.team.2.species",
	"battle.opponent.team.3.species",
	"battle.opponent.team.4.species",
	"battle.opponent.team.5.species",
	"meta.state",
	"pointers.callback_1",
];

type BattleMode = "None" | "Wild" | "Trainer";

export type BattleInfo = {
	type: BattleMode,
	trainerName: string | null,
	teamSize: number,
	currentPokemon: number,
	weather: string,
}

export const battleInfo = signal<BattleInfo>({
	type: "None",
	currentPokemon: 0,
	teamSize: 0,
	trainerName: null,
	weather: ""
});

const getBattleInfo = (): BattleInfo => {
	let type = Store.getProperty<BattleMode>("battle.mode")?.value ?? "None";
	var opponentId = Store.getProperty<number>("battle.opponent.id")?.value;
	if (Store.getProperty<number>("battle.opponent.id")?.value === 0) {
		type = "None";
	}
	const trainerName = (Store.getProperty<string>("battle.opponent.trainer")?.value);
	let teamSize = Store.getProperty<number>("battle.opponent.team_count")?.value ?? 0;
	// gen3 workaround:
	if (trainerName && opponentId !== 0 && type === "None" && Store.getProperty("meta.state")?.value === "Battle") {
		type = "Trainer";
		teamSize = 1;
		for(let i=1; i < 6; i++) {
			if (Store.getProperty(`battle.opponent.team.${i}.species`)?.value) {
				teamSize++;
			}
		}
	}
	return {
		type: type,
		trainerName: trainerName ?? "",
		currentPokemon: Store.getProperty<number>("battle.opponent.party_position")?.value ?? 0,
		teamSize: teamSize,
		weather: Store.getProperty<string>("battle.field.weather")?.value ?? "",
	};
}

subscribePaths(
	defaultBattleProperties, 
	() => battleInfo.value = getBattleInfo()
);
