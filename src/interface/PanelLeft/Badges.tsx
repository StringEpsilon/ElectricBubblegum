import { usePropertyMap } from "../../hooks/useGameProperty";
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

const BadgeMap = {
	"1": "player.badges.badge1",
	"2": "player.badges.badge2",
	"3": "player.badges.badge3",
	"4": "player.badges.badge4",
	"5": "player.badges.badge5",
	"6": "player.badges.badge6",
	"7": "player.badges.badge7",
	"8": "player.badges.badge8",
}

export function Badges() {
	const badges = usePropertyMap<Badges>(BadgeMap);
	return (
		<div class="badges">
			{["1","2","3","4", "5", "6","7","8"].map(x => 
				<input type="checkbox" checked={badges && badges[x as keyof Badges] || false} />
			)}
		</div>
	);
}
