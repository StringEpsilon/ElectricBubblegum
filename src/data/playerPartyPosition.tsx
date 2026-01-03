import { signal } from "@preact/signals";
import { Store } from "../PokeAByte/PropertyStore";


export const playerPartyPosition = signal<number>(0);
Store.addUpdateListener(path => {
	if (path === "battle.yourPokemon.partyPos") {
		playerPartyPosition.value = Store.getProperty("battle.yourPokemon.partyPos")?.value ?? 0;
	}
});
