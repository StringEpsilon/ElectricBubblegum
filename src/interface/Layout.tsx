import { PokemonGeneration } from "../data/DataTypes";
import { PanelLeft } from "./PanelLeft/PanelLeft";
import { PanelMiddle } from "./PanelMiddle/PanelMiddle";
import { PanelRight } from "./PanelRight/PanelRight";

export function Layout({ gen: generation }: { gen: PokemonGeneration }) {
	let layout: string = "gbc";
	if (generation == "3") {
		layout = "gba"
	} else if (generation == "4") {
		layout = "nds"
	}
	return (
		<div class={layout}>
			<PanelLeft />
			<PanelMiddle />
			<PanelRight />
		</div>
	)
}

