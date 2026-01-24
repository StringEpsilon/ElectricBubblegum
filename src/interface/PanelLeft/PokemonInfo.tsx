import { PlayerParty } from "./PlayerParty";
import { signal } from "@preact/signals";
import { Shortcut, shortcutsSignal } from "../../signals/shortCutsSignal";
import { ActivePokemon } from "./ActivePokemon";

export const panelSignal = signal<"active" | "party">("active");

window.addEventListener("onGamepadButton", (e: any) => {
	const shortcuts = shortcutsSignal.peek()
	if (e.detail.button === shortcuts[Shortcut.pokemonInfo]) {
		panelSignal.value = panelSignal.peek() === "active" ? "party" : "active";
	}
});

export function PokemonInfo() {
	return (
		<div>
			<div class={"tab-bar"}>
				<button
					onClick={() => panelSignal.value = "active"}
					class={"tab " + (panelSignal.value === "active" ? "active" : "")}
				>
					Active Pokemon
				</button>
				<button
					onClick={() => panelSignal.value = "party"}
					class={"tab " + (panelSignal.value === "party" ? "active" : "")}
				>
					Party
				</button>
			</div>
			{panelSignal.value === "active"
				? <ActivePokemon />
				: <PlayerParty />
			}
		</div>
	);
}
