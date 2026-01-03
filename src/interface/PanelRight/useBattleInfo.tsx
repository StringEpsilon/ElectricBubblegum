import { Store } from "../../PokeAByte/PropertyStore";
import { signal } from "@preact/signals";


const defaultBattleProperties = [
	"battle.mode", 
	"battle.opponent.trainer", 
	"battle.opponent.name", 
	"battle.opponent.party_position", 
	"battle.opponent.team_count",
	"battle.opponent.id"
];

type BattleMode = "None" | "Wild" | "Trainer";

export type BattleInfo = {
	type: BattleMode,
	trainerName: string | null,
	teamSize: number,
	currentPokemon: number,
}

export const battleInfo = signal<BattleInfo>({
	type: "None",
	currentPokemon: 0,
	teamSize: 0,
	trainerName: null
});

const getBattleInfo = (): BattleInfo => {
	let type = Store.getProperty<BattleMode>("battle.mode")?.value ?? "None";
	if (Store.getProperty<number>("battle.opponent.id")?.value === 0) {
		type = "None";
	}
	const trainerName = (Store.getProperty<string>("battle.opponent.trainer")?.value)!;
	return {
		type: type,
		trainerName: trainerName,
		currentPokemon: Store.getProperty<number>("battle.opponent.party_position")?.value ?? 0,
		teamSize: Store.getProperty<number>("battle.opponent.team_count")?.value ?? 1
	};
}

Store.addUpdateListener((path) => {
	if (defaultBattleProperties.includes(path)) {
		battleInfo.value = getBattleInfo();
	}
})
