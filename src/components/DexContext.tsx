import { useEffect, useState } from "preact/hooks";
import { PokemonGame, PokemonGeneration, PokemonMove, PokemonSpecies } from "../data/DataTypes";
import { createContext } from "preact";

type PokeDex = Record<string, PokemonSpecies>;
export type MoveLookup = Record<string, Record<string, PokemonMove>>;
export type MachineMoveMap = Record<PokemonGeneration, Record<string, string>>;
export interface PokedexContextData {
	pokedex: PokeDex,
	machineMoveMap: MachineMoveMap,
	moves: MoveLookup
}

/**
 * Context holding the advanced mode state.
 */
export const DexContext = createContext<PokedexContextData>(null!);

export function DexContextProdiver(props: {game: PokemonGame, children: React.ReactElement}) {
	const [pokedex, setPokedex] = useState<PokeDex|null>(null);
	const [tmHm, setTmHm] = useState<MachineMoveMap|null>(null);
	const [moves, setMoves] = useState<MoveLookup|null>(null);

	useEffect(() => {
		let promise;
		switch (props.game) {
			case "Yellow":
				// @ts-expect-error
				promise = import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/pokedex/yellow.js");
				break;
			case "Crystal":
				// @ts-expect-error
				promise = import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/pokedex/crystal.js");
				break;
			case "Emerald":
				// @ts-expect-error
				promise = import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/pokedex/emerald.js");
				break;
			case "FireRed and LeafGreen":
				// @ts-expect-error
				promise = import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/pokedex/firered_leafgreen.js");
				break;
			case "Platinum":
				// @ts-expect-error
				promise = import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/pokedex/platinum.js");
				break;
			case "HeartGold and SoulSilver":
				// @ts-expect-error
				promise = import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/pokedex/heartgold_soulsilver.js");
				break;
		}
		promise.then(module => setPokedex(module.pokedex) )
	}, [props.game]);

	useEffect(() => {
		// @ts-expect-error
		import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/tmhm.js")
			.then(x => setTmHm(x.tmhm));
		// @ts-expect-error
		import("https://cdn.jsdelivr.net/gh/Scotts-Thoughts/data_objects@main/moves.js")
			.then(x => setMoves(x.moves));
	}, []);
	if (!pokedex || !tmHm || !moves) {
		return <div>
			Downloading Pokedex data for {props.game}.
			<br/>
			pokedex: {pokedex ? "yes" : "no"} <br/>
			tmHm: {tmHm ? "yes" : "no"} <br/>
			moves: {moves ? "yes" : "no"}
		</div>;
	}
	return (
		<DexContext.Provider value={{pokedex, machineMoveMap: tmHm, moves}}>
			{props.children}
		</DexContext.Provider>
	);
}