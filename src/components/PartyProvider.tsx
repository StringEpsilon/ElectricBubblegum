import { PokemonGame, PokemonGeneration, PokemonSpecies } from "../data/DataTypes";
import { createContext } from "preact";
import { getPartyPokemonMap } from "../functions/mappings/getPartyPokemonMap";
import { CurrentPokemon } from "../data/CurrentPokemon";
import { useContext, useEffect, useState } from "preact/hooks";
import { DexContext } from "./DexContext";
import { getPropertyInvariant } from "../functions/getPropertyInvariant";
import { PropertyMap, usePropertyMap, usePropertyValue } from "../hooks/useGameProperty";
import { useGameState } from "../hooks/useIsInBattle";
import { useBattleInfo } from "../interface/PanelRight/useBattleInfo";
import { getOpponentPokemonMap } from "../interface/PanelRight/functions/getOpponentPokemonMap";
import { OpponentPokemon } from "../interface/PanelRight/types/OpponentPokemon";

export interface PokemonData {
	playerDexEntry: PokemonSpecies | null,
	playerCurrent: CurrentPokemon | null,
	opponentDexEntry: PokemonSpecies | null,
	opponentCurrent: CurrentPokemon | null,
	battleType: "None" | "Trainer" | "Wild"

}

export const PokemonDataContext = createContext<PokemonData>(null!);

type Props = {
	game: PokemonGame, 
	generation: PokemonGeneration,
	children: React.ReactElement,
}
export function PokemonDataProvider({generation, children}: Props) {
	const battlePartyPosition = usePropertyValue<number>("battle.yourPokemon.partyPos");
	const battleInfo = useBattleInfo(generation);

	const isInBattle = useGameState(generation) === "Battle";
	const [playerPartyMap, setPlayerPartyMap] = useState<PropertyMap<CurrentPokemon>>(
		() => getPartyPokemonMap(generation, isInBattle, battlePartyPosition ?? 0)
	);
	const [opponentPokemonMap, setOpponentPokemonMap] = useState<PropertyMap<OpponentPokemon>>(
		() => getOpponentPokemonMap(generation, battleInfo.currentPokemon, true)
	);
	useEffect(() => {
		setPlayerPartyMap(getPartyPokemonMap(generation, isInBattle, battlePartyPosition ?? 0));
		setOpponentPokemonMap(
			getOpponentPokemonMap(generation, battleInfo.currentPokemon, true)
		);
	}, [generation, isInBattle, battlePartyPosition]);

	const playerCurrent = usePropertyMap(playerPartyMap);
	const opponentCurrent = usePropertyMap(opponentPokemonMap);
	const { pokedex } = useContext(DexContext);
	const playerDexEntry: PokemonSpecies | null = getPropertyInvariant(pokedex, playerCurrent?.species ?? "");
	const opponentDexEntry: PokemonSpecies | null = getPropertyInvariant(pokedex, opponentCurrent?.species ?? "");
	return (
		<PokemonDataContext.Provider value={{ 
			playerDexEntry, 
			playerCurrent, 
			battleType: battleInfo.type,
			opponentCurrent: opponentDexEntry
		}}>
			{children}
		</PokemonDataContext.Provider>
	);
}