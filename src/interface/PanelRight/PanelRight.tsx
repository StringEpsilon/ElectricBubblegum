import { useContext } from "preact/hooks";
import { MovePool } from "./MovePool";
import "./panel-right.css";
import { Opponent } from "./Opponent/Opponent";
import { GameContext } from "../../components/GameContext";
import { useGameState } from "../../hooks/useIsInBattle";

export function PanelRight() {
	const { generation } = useContext(GameContext)
	const gameState = useGameState(generation);
	return (
		<div class="panel-right">
			{(gameState === "Battle" || gameState === "To Battle")
				? <Opponent gen={generation} />
				: <MovePool />
			}
		</div>
	)
}

