import { useCallback, useEffect, useState } from "preact/hooks";
import { PokemonGeneration } from "../data/DataTypes";
import { Store } from "../PokeAByte/PropertyStore";
import { GameState } from "../data/GameState";

const gameStateProperties = {
	"1": ["meta.state"],
	"2": ["meta.state"],
	"3": ["battle.turnInfo.battleOutcome", "battle.turnInfo.battleBackgroundTiles"],
	"4": ["meta.state"]
}

export function useGameState(gen: PokemonGeneration) {
	const [gameState, setGameState] = useState<GameState>("Overworld");
	const updateState = useCallback(() => {
		switch (gen) {
			case "1":
			case "2":
				setGameState(Store.getProperty<GameState>("meta.state")?.value ?? "Overworld");
				break;
			case "3":
				if (!Store.getProperty<number>("player.teamCount")) {
					setGameState("No Pokemon");
				} else if (
					Store.getProperty<string>("battle.turnInfo.battleOutcome")?.value == null
					&& !!(Store.getProperty<number>("battle.turnInfo.battleBackgroundTiles")?.value)
				) {
					setGameState("Battle");
				} else {
					setGameState("Overworld");
				}
				break;
			case "4":
				setGameState(Store.getProperty<GameState>("meta.state")?.value ?? "Overworld");
				break;
		}
	}, [gen]);
	const handleUpdate = useCallback((path: string) => {
		if (gameStateProperties[gen].includes(path)) {
			updateState();
		}
	}, [gen]);
	useEffect(() => {
		Store.addUpdateListener(handleUpdate)
		updateState();
		return () => Store.removeUpdateListener(handleUpdate);
	}, [handleUpdate])

	return gameState;
}
