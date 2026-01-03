import { Store } from "./PokeAByte/PropertyStore"
import { PokemonGame, PokemonGeneration } from "./data/DataTypes";
import { Layout } from "./interface/Layout";
import { gameContext, GameContext } from "./components/GameContext";
import { Mapper } from "pokeaclient";
import { useEffect, useSyncExternalStore } from "preact/compat";
import { TableRow } from "./components/TableRow";

const Mappers = {
	"yellow": "official_gen1_pokemon_yellow_deprecated",
	"crystal": "official_gen2_pokemon_crystal_deprecated",
	"emerald": "official_gen3_pokemon_emerald_deprecated_ne",
	"platinum": "official_gen4_pokemon_platinum_ne",
}

function App() {
	const mapper = useSyncExternalStore(Store.subscribeMapper, Store.getMapper);
	const isConnected = useSyncExternalStore(Store.subscribeConnected, Store.isConnected);

	switch (mapper) {
		default: {
			if (!isConnected) {
				return (
					<div class={"mapper-error"}>
						<div>
							<h1>Error</h1>
							<p>
								No connection to Poke-A-Byte.
							</p>
							<p>
								Make sure Poke-A-Byte is running.
								If you don not have Poke-A-Byte installed, you
								can <a href="https://github.com/PokeAByte/PokeAByte/releases/latest">download it here</a>.
							</p>
						</div>
					</div>
				)
			} else if (!mapper) {
				return (
					<div class={"mapper-error"}>
						<div>
							<h1>Error</h1>
							<p>
								No mapper loaded in Poke-A-Byte.
							</p>
							<p>
								<a href="http://localhost:8085/ui/mapper/">You can load a mapper here</a>. <br />
								Make sure you use a compatible emulator with the correct settings. <br />
								If you have the mappers installed and your emulator is running, use one of these buttons:
							</p>
							<button type={"button"} onClick={() => Store.client.changeMapper(Mappers.yellow)}>
								Yellow
							</button> &nbsp;
							<button type={"button"} onClick={() => Store.client.changeMapper(Mappers.crystal)}>
								Crystal
							</button> &nbsp;
							<button type={"button"} onClick={() => Store.client.changeMapper(Mappers.emerald)}>
								Emerald
							</button> &nbsp;
							<button type={"button"} onClick={() => Store.client.changeMapper(Mappers.platinum)}>
								Platinum
							</button>
						</div>
					</div>
				)
			} else {
				return <Game mapper={mapper} />
			}
		}
	}
}

export function Game({ mapper }: { mapper: Mapper }) {
	const gameData = getGame(mapper.gameName);
	useEffect(() => {
		if (gameData) {
			gameContext.value = {
				...gameData,
			}
		}
	}, [gameData]);
	if (!gameData) {
		return (
			<div class={"mapper-error"}>
				<div>
					<h1>Error</h1>
					<p>
						The mapper "{mapper.gameName}" is currently not supported.
					</p>

					<h2>Supported games:</h2>
					<table class={"striped"}>
						<thead>
							<tr>
								<td>Game</td>
								<td>Mapper</td>
							</tr>
						</thead>
						<tbody>
							<TableRow title="Yellow">Pokemon Yellow</TableRow>
							<TableRow title="Crystal">Pokemon Crystal</TableRow>
							<TableRow title="Emerald">Pokemon Emerald</TableRow>
							<TableRow title="Platinum">Pokemon Platinum</TableRow>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
	return (
		<GameContext.Provider value={{ ...gameData }}>
			<Layout gen={gameData.generation} />
		</GameContext.Provider>
	);
}

function getGame(mapperName: string): { game: PokemonGame, generation: PokemonGeneration } | null {
	switch (mapperName) {
		case "Pokemon Yellow":
			return { game: "Yellow", generation: "1" };
		case "Pokemon Crystal":
			return { game: "Crystal", generation: "2" };
		case "Pokemon Emerald":
			return { game: "Emerald", generation: "3" };
		case "Pokemon Platinum":
			return { game: "Platinum", generation: "4" };
	}
	return null;
}

export default App
