import { PokemonGame, PokemonGeneration } from "../data/DataTypes";
import { signal } from "@preact/signals";
import { Store } from "../PokeAByte/PropertyStore";

export interface GameContextData {
	name: PokemonGame,
	generation: PokemonGeneration,
}

export const gameSignal = signal<GameContextData>({
	name: "Yellow",
	generation: "1",
});

Store.subscribeMapper(() => {
	switch (Store.getMapper()?.gameName) {
		case "Pokemon Yellow":
			gameSignal.value = { name: "Yellow", generation: "1" };
			break;
		case "Pokemon Crystal":
			gameSignal.value = { name: "Crystal", generation: "2" };
			break;
		case "Pokemon Emerald":
			gameSignal.value = { name: "Emerald", generation: "3" };
			break;
		case "Pokemon Platinum":
			gameSignal.value = { name: "Platinum", generation: "4" };
			break;
	}	
})