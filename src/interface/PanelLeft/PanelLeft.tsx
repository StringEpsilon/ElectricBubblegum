import "./panel-left.css"
import { PokemonInfo } from "./PokemonInfo";
import { RunInfo } from "./RunInfo";

export function PanelLeft() {
	return (
		<div class="panel-left">
			<RunInfo />
			<PokemonInfo/>
		</div>
	);
}