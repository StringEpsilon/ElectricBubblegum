import { useSignalEffect } from "@preact/signals";
import { shortcutSelected, shortcutsSignal, Shortcut, assignShortcut, cancelShortcut } from "../../signals/shortCutsSignal";

export function stringOrNone(value: string|undefined|null) {
	return value ? value : "[none]";
}

export function OptionsPanel() {
	useSignalEffect(() => {
		const activeShortcut = shortcutSelected.peek();
		if (activeShortcut && shortcutsSignal.value[activeShortcut]) {
			if (document.activeElement instanceof HTMLInputElement) {
				document.activeElement.blur();
			}
		}
	});
	const shortCuts = shortcutsSignal.value;
	return (
		<div class="config-panel">
			<div>Gamepad shortcuts</div>
			<div>
				<label>Switch PKMN info</label>
				<input
					type="textbox"
					readonly
					value={stringOrNone(shortCuts[Shortcut.pokemonInfo])}
					size={9}
					onFocus={() => assignShortcut(Shortcut.pokemonInfo)}
					onBlur={cancelShortcut} />
			</div>
			<div>
				<label>Movepool next</label>
				<input
					type="textbox"
					readonly
					value={stringOrNone(shortCuts[Shortcut.movePoolNext])}
					size={9}
					onFocus={() => assignShortcut(Shortcut.movePoolNext)}
					onBlur={cancelShortcut} />
			</div>
		</div>
	);
}
