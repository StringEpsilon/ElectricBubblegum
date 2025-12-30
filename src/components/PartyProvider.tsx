import { PokemonGame, PokemonGeneration, PokemonSpecies } from "../data/DataTypes";
import { createContext } from "preact";
import { getPartyPokemonMap } from "../functions/mappings/getPartyPokemonMap";
import { CurrentPokemon } from "../data/CurrentPokemon";
import { useContext, useEffect, useState } from "preact/hooks";
import { DexContext } from "./DexContext";
import { getPropertyInvariant } from "../functions/getPropertyInvariant";
import { PropertyMap, usePropertyMap, usePropertyValue } from "../hooks/useGameProperty";
import { useGameState } from "../hooks/useIsInBattle";

export interface PokemonData {
	dexEntry: PokemonSpecies | null,
	current: CurrentPokemon | null,
	isInBattle: boolean,
}

export const PokemonDataContext = createContext<PokemonData>(null!);

type Props = {
	game: PokemonGame, 
	generation: PokemonGeneration,
	children: React.ReactElement,
}
export function PokemonDataProvider({generation, children}: Props) {
	const battlePartyPosition = usePropertyValue<number>("battle.yourPokemon.partyPos");

	const isInBattle = useGameState(generation) === "Battle";
	const [propertyMap, setPropertyMap] = useState<PropertyMap<CurrentPokemon>>(
		() => getPartyPokemonMap(generation, isInBattle, battlePartyPosition ?? 0)
	);
	useEffect(() => {
		setPropertyMap(getPartyPokemonMap(generation, isInBattle, battlePartyPosition ?? 0));
	}, [generation, isInBattle, battlePartyPosition]);

	const currentPokemon = usePropertyMap(propertyMap);
	const { pokedex } = useContext(DexContext);
	const dexEntry: PokemonSpecies | null = getPropertyInvariant(pokedex, currentPokemon?.species ?? "");

	return (
		<PokemonDataContext.Provider value={{ dexEntry: dexEntry, current: currentPokemon, isInBattle }}>
			{children}
		</PokemonDataContext.Provider>
	);
}