import { signal } from "@preact/signals";

export enum Shortcut {
	pokemonInfo = "pokemonInfo",
	movePoolNext = "movePoolNext",
}

export const shortcutSelected = signal<Shortcut|null>(null);
export const shortcutsSignal = signal<Partial<Record<Shortcut, string|null>>>({});

let gamepadCallback: EventListenerOrEventListenerObject | null = null;

export function assignShortcut(shortcut: Shortcut) {
	shortcutSelected.value = shortcut;
	shortcutsSignal.value = {
		...shortcutsSignal.peek(),
		[shortcut]: null,
	};
	gamepadCallback = (e: any) => {
		shortcutsSignal.value = {
			...shortcutsSignal.peek(),
			[shortcut]: e.detail.button,
		};
		cancelShortcut();
	}
	window.addEventListener("onGamepadButton", gamepadCallback);
}


export function cancelShortcut() {
	shortcutSelected.value = null;
	if (gamepadCallback) {
		window.removeEventListener("onGamepadButton", gamepadCallback);
	}
}
