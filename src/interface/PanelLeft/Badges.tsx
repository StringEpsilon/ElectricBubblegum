import { signal } from "@preact/signals";
import "./badges.css";
import { For } from "@preact/signals/utils";
import { subscribePaths } from "../../functions/subscribePaths";
import { Store } from "../../PokeAByte/PropertyStore";

let badgePaths: string[] = [];
for(let i = 0; i < 16; i++) {
	badgePaths.push(`player.badges.${i}`);
}

export const badgeSignal = signal<boolean[]>(badgePaths.map(() => false).slice(0, 8));
export const allBadges = signal<boolean[]>(badgePaths.map(() => false));
subscribePaths(badgePaths, (updatedPath) => {
	var newValue = structuredClone(allBadges.value);
	newValue[Number(updatedPath.split(".").at(2))] = Store.getProperty(updatedPath)?.value ?? false;
	allBadges.value = newValue;
	badgeSignal.value = newValue.slice(0, 8);
});

export function Badges() {
	return (
		<div class="badges">
			<For each={badgeSignal} children={value => <input type="checkbox" checked={value} />} />
		</div>
	);
}
