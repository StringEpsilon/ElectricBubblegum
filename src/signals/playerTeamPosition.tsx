import { signal } from "@preact/signals";
import { Store } from "../PokeAByte/PropertyStore";

export const playerTeamPosition = signal<number>(0);

Store.addUpdateListener(path => {
	if (path === "battle.yourPokemon.partyPos") {
		playerTeamPosition.value = Store.getProperty("battle.yourPokemon.partyPos")?.value ?? 0;
	}
});
