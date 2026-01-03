import { computed, effect, signal } from "@preact/signals";
import { PokemonSpecies } from "../data/DataTypes";
import { getPropertyInvariant } from "../functions/getPropertyInvariant";
import { playerStatsSignal } from "../components/PartyProvider";
import { dexContextSignal } from "../components/DexContext";

export const playerDexSignal = signal<PokemonSpecies | null>(null);
effect(() => {
	const pokedex = computed(() => dexContextSignal.value?.pokedex).value;
	const species = computed(() => playerStatsSignal.value?.species).value;
	if (pokedex) {
		playerDexSignal.value = getPropertyInvariant(pokedex, species ?? "");
	}
});