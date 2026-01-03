import { signal } from "@preact/signals";
import { Store } from "../PokeAByte/PropertyStore";
import { subscribePaths } from "../functions/subscribePaths";

export const playerTeamPosition = signal<number>(0);

subscribePaths(
	["battle.yourPokemon.partyPos"], 
	() => playerTeamPosition.value = Store.getProperty("battle.yourPokemon.partyPos")?.value ?? 0
);
