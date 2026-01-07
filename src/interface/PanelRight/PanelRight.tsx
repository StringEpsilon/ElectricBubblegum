import { MovePool } from "./MovePool";
import "./panel-right.css";
import { Opponent } from "./Opponent/Opponent";
import { battleInfo, } from "./useBattleInfo";
import { gameState } from "../../data/gameState";
import { useComputed } from "@preact/signals";

export function PanelRight() {
	const type = useComputed(() => battleInfo.value.type).value;
	
	var inTrainerBattle = (gameState.value === "Battle" || gameState.value === "From Battle" || gameState.value === "To Battle")
		&& type === "Trainer";
	return (
		<div class="panel-right">
			{(inTrainerBattle)
				? <Opponent />
				: <MovePool  />
			}
		</div>
	)
}

