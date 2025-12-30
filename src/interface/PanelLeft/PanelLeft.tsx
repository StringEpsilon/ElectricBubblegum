import "./panel-left.css"
import { PokemonInfo } from "./PokemonInfo";
import { RunInfo } from "./RunInfo";
import { PartyMoves } from "./PartyMoves";

export function PanelLeft() {
	return (
		<div class="panel-left">
			<RunInfo />
			<PokemonInfo/>
			<PartyMoves  />
		</div>
	);
}