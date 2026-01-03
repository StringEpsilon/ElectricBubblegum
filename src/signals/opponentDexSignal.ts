import { computed, effect, signal } from "@preact/signals";
import { PokemonSpecies } from "../data/DataTypes";
import { dexContextSignal } from "../components/DexContext";
import { opponenStatsSignal } from "../components/PartyProvider";
import { getPropertyInvariant } from "../functions/getPropertyInvariant";

export const opponentDexSignal = signal<PokemonSpecies | null>(null);
effect(() => {
	const pokedex = computed(() => dexContextSignal.value?.pokedex).value;
	const opponentSpecies = computed(() => opponenStatsSignal.value?.species).value;
	if (pokedex) {
		opponentDexSignal.value = getPropertyInvariant(pokedex, opponentSpecies ?? "");
	}
});
