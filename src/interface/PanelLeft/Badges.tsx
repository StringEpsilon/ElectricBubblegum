import { propertySignal } from "../../functions/propertySignal";
import "./badges.css";

type Badges = {
	"1": boolean,
	"2": boolean,
	"3": boolean,
	"4": boolean,
	"5": boolean,
	"6": boolean,
	"7": boolean,
	"8": boolean,
}

const badge1 = propertySignal<boolean>("player.badges.badge1");
const badge2 = propertySignal<boolean>("player.badges.badge2");
const badge3 = propertySignal<boolean>("player.badges.badge3");
const badge4 = propertySignal<boolean>("player.badges.badge4");
const badge5 = propertySignal<boolean>("player.badges.badge5");
const badge6 = propertySignal<boolean>("player.badges.badge6");
const badge7 = propertySignal<boolean>("player.badges.badge7");
const badge8 = propertySignal<boolean>("player.badges.badge8");

export function Badges() {
	return (
		<div class="badges">
			<input type="checkbox" checked={badge1} />
			<input type="checkbox" checked={badge2} />
			<input type="checkbox" checked={badge3} />
			<input type="checkbox" checked={badge4} />
			<input type="checkbox" checked={badge5} />
			<input type="checkbox" checked={badge6} />
			<input type="checkbox" checked={badge7} />
			<input type="checkbox" checked={badge8} />
		</div>
	);
}
