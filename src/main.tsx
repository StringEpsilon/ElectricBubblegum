import { ContainerNode, render } from "preact";
import App from "./App.tsx";
import "./style/fonts.css";
import "./style/general.css";

render(
	<App />,
	document.getElementById("root") as ContainerNode
);

let pressedButtons: string[] = [];
function listenGamepad() {
	const gamepad = navigator.getGamepads()[0];
	if (gamepad) {
		const currentPressedButtons = [
			...gamepad.buttons
				.map((x, index) => ({index, button: x}))
				.filter(x => x.button.pressed)
				.map(x => "Button " + x.index),
			...gamepad.axes
				.map((x, index) => ({name: "Axis " + index + (x > 0 ? " +" : " -"), value: x}))
				.filter(x => Math.abs(x.value) > 0.25)
				.map(x => x.name)
		];

		if (currentPressedButtons.length > 0) {
			if (!currentPressedButtons.some(x => pressedButtons.includes(x))) {
				new CustomEvent("onGamepadButton");
				currentPressedButtons.forEach(index => {
					window.dispatchEvent(new CustomEvent("onGamepadButton", { detail: { button: index } }))
				})
			}
		}
		pressedButtons = currentPressedButtons;
	}
	window.requestAnimationFrame(listenGamepad);
}
window.requestAnimationFrame(listenGamepad);