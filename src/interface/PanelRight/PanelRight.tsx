import { MovePool } from "./MovePool";
import "./panel-right.css";
import { Opponent } from "./Opponent/Opponent";
import { battleInfo, } from "./useBattleInfo";
import { gameState } from "../../data/gameState";

export function PanelRight() {
	const { type, trainerName, currentPokemon} = battleInfo.value;
	
	var inTrainerBattle = (gameState.value === "Battle" || gameState.value === "From Battle" || gameState.value === "To Battle")
		&& type === "Trainer";
	return (
		<div class="panel-right">
			{(inTrainerBattle)
				? <Opponent gameState={gameState.value}  name={trainerName} teamIndex={currentPokemon}/>
				: <MovePool  />
			}
		</div>
	)
}

