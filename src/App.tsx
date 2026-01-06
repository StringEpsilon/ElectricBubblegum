import { Store } from "./PokeAByte/PropertyStore"
import { Layout } from "./interface/Layout";
import { gameSignal } from "./components/GameContext";
import { Mapper } from "pokeaclient";
import { useSyncExternalStore } from "preact/compat";
import { TableRow } from "./components/TableRow";
import { dexContextSignal } from "./components/DexContext";

const Mappers = [
	["Yellow", "official_gen1_pokemon_yellow"],
	["Crystal", "official_gen2_pokemon_crystal"],
	["Emerald", "official_gen3_pokemon_emerald"],
	["Platinum", "official_gen4_pokemon_platinum"],
]

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
							{Mappers.map(array => 
								<>
									<button type="button" onClick={() => Store.client.changeMapper(array[1])}>
										{array[0]}
									</button> &nbsp;
								</>
							)}
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
	if (!gameSignal.value) {
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
	if (!dexContextSignal.value) {
		return null;
	}
	return (
		<Layout gen={gameSignal.value.generation} />
	);
}



export default App
