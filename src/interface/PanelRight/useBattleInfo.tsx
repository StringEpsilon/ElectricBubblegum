import { useState, useCallback, useEffect } from "preact/hooks";
import { PokemonGeneration } from "../../data/DataTypes";
import { Store } from "../../PokeAByte/PropertyStore";


const gameStateProperties = {
	"1": ["battle.trainer.name", "battle.type", "battle.enemyPokemon.partyPos", "battle.trainer.totalPokemon"],
	"2": ["battle.mode", "battle.trainer.class", "battle.textBuffer", "battle.enemyPokemon.partyPos"],
	"3": [
		"battle.trainer.opponentA", "battle.turnInfo.battleOutcome", "battle.trainer.totalPokemon",
		"battle.enemyPokemon.partyPos",
		"battle.trainer.team.0.species", "battle.trainer.team.1.species", "battle.trainer.team.2.species",
		"battle.trainer.team.3.species", "battle.trainer.team.4.species", "battle.trainer.team.5.species",
	],
	"4": ["battle.opponent.trainer", "battle.mode", "battle.opponent.team_count", "battle.opponent.party_position"]
}

export type BattleInfo = {
	type: "None" | "Wild" | "Trainer",
	trainerName: string | null,
	teamSize: number,
	currentPokemon: number,
}

export function useBattleInfo(gen: PokemonGeneration) {
	const [battleInfo, setBattleInfo] = useState<BattleInfo>({
		type: "None",
		currentPokemon: 0,
		teamSize: 0,
		trainerName: null
	});
	const updateState = useCallback(() => {
		switch (gen) {
			case "1": {
				const type = (Store.getProperty<"None" | "Wild" | "Trainer">("battle.type")?.value)!;
				const trainerName = (Store.getProperty<string>("battle.trainer.name")?.value)!
					+ " " + (Store.getProperty<string>("battle.trainer.number")?.value)!;
				setBattleInfo({
					type: type === "Trainer" ? "Trainer" : "Wild",
					trainerName,
					currentPokemon: type === "Trainer"
						? (Store.getProperty<number>("battle.enemyPokemon.partyPos")?.value)!
						: 0,
					teamSize: type === "Trainer"
						? (Store.getProperty<number>("battle.trainer.totalPokemon")?.value)!
						: 1
				});
				break;
			}
			case "2": {
				const type = (Store.getProperty<string>("battle.mode")?.value)!;
				const trainerName = (Store.getProperty<string>("battle.trainer.class")?.value)!
					+ " " + (Store.getProperty<string>("battle.textBuffer")?.value)!;
				setBattleInfo({
					type: type === "Trainer" ? "Trainer" : "Wild",
					trainerName: type === "Trainer"
						? trainerName
						: "",
					currentPokemon: type === "Trainer"
						? (Store.getProperty<number>("battle.enemyPokemon.partyPos")?.value)!
						: 0,
					teamSize: type === "Trainer"
						? Store.getProperty<number>("battle.trainer.totalPokemon")?.value ?? 1
						: 1,
				});
				break;
			}
			case "3": {
				let teamSize = 0;
				for (let i = 0; i < 6; i++) {
					if ((Store.getProperty<number>(`battle.trainer.team.${i}.species`)?.value)! != null) {
						teamSize++;
					}
				}
				setBattleInfo({
					trainerName: Store.getProperty<string>("battle.trainer.opponentA")?.value ?? "",
					type: Store.getProperty<boolean>("battle.type.trainer")?.value
						? "Trainer"
						: "Wild",
					currentPokemon: Store.getProperty<number>("battle.enemyPokemon.partyPos")?.value ?? 0,
					teamSize: teamSize,
				});
				break;
			}
			case "4": {
				setBattleInfo({
					trainerName: Store.getProperty<string>("battle.opponent.trainer")?.value ?? "",
					type: Store.getProperty<string>("battle.mode")?.value === "Trainer"
						? "Trainer"
						: "Wild",
					teamSize: Store.getProperty<number>("battle.opponent.team_count")?.value ?? 0,
					currentPokemon: Store.getProperty<number>("battle.opponent.party_position")?.value ?? 0,
				});
				break;
			}
		}
	}, [gen]);

	const handleUpdate = useCallback((path: string) => {
		if (gameStateProperties[gen].includes(path)) {
			updateState();
		}
	}, [gen]);
	useEffect(() => {
		Store.addUpdateListener(handleUpdate);
		updateState();
		return () => Store.removeUpdateListener(handleUpdate);
	}, [handleUpdate, gen]);

	return battleInfo;
}
