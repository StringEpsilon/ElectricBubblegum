import { OpponentTeam } from "./OpponentTeam";
import { useComputed } from "@preact/signals";
import { battleInfo } from "../useBattleInfo";

export function Opponent() {
	const name = useComputed(() => battleInfo.value.trainerName);

	return (
		<div class={"opponent"}>
			<h2>
				Battle: {name}
			</h2>
			<OpponentTeam />
		</div>
	);
}
