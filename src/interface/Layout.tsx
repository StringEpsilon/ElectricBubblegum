import { signal } from "@preact/signals";
import { PokemonGeneration } from "../data/DataTypes";
import { PanelLeft } from "./PanelLeft/PanelLeft";
import { PanelMiddle } from "./PanelMiddle/PanelMiddle";
import { PanelRight } from "./PanelRight/PanelRight";

const panelSignal = signal<"top" | "bottom">("top");

export function Layout({ gen: generation }: { gen: PokemonGeneration }) {
	let layout: string = "gbc";
	if (generation == "3") {
		layout = "gba"
	} else if (generation == "4") {
		layout = "nds " + panelSignal.value
	}
	return (
		<div class={layout}>
			<PanelLeft />
			<PanelMiddle />
			<PanelRight />
		</div>
	)
}

