import { useState } from "preact/hooks";
import { PokemonMovePool } from "../../data/DataTypes";
import { gameContext } from "../../components/GameContext";
import { mapMovePool } from "../../functions/mapMovePool";
import { playerDexSignal } from "../../components/PartyProvider";
import { dexContextSignal } from "../../components/DexContext";

export function MovePool() {
	const { machineMoveMap, moves } = dexContextSignal.value;
	const {generation} = gameContext.value;
	const dexEntry = playerDexSignal.value;
	const pool: PokemonMovePool = mapMovePool(dexEntry, generation, moves, machineMoveMap);
	const [tab, setTab] = useState<keyof PokemonMovePool>("level");
	return (
		<>
			<span class="tab-bar">
				<button class={`tab tab-sideways ${tab === "level" ? "active" : ""}`} onClick={() => setTab("level")}>Level</button>
				<button class={`tab tab-sideways ${tab === "tmhm" ? "active" : ""}`} onClick={() => setTab("tmhm")}>Machine</button>
				{generation !== "1" && 
					<button class={`tab tab-sideways ${tab === "tutor" ? "active" : ""}`} onClick={() => setTab("tutor")}>Tutor</button>
				}
			</span>
			<div class="move-pool">
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Type</th>
							<th>Pwr.</th>
							<th>Acc.</th>
						</tr>
					</thead>
					<tbody>
						{pool && pool[tab].map(move => {
							const typeCss = (move.move === "Curse"
								? "curse"
								: move.type).toLowerCase()
							const type = move.move === "Curse"
								? "???"
								: move.type;
							return (
								<tr key={`${tab}-${move.source}-${move.move}`} >
									<td>{move.source}</td>
									<td>{move.move}</td>
									<td class={"color type "+ typeCss}>{type}</td>
									<td>{move.power ?? "-"}</td>
									<td>{move.accuracy ?? "-"}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
