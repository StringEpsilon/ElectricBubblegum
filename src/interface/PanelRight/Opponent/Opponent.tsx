import { PokemonGeneration } from "../../../data/DataTypes";
import { useGameState } from "../../../hooks/useIsInBattle";
import { OpponentTeam } from "./OpponentTeam";
import { useBattleInfo } from "../useBattleInfo";

export function Opponent(props: {gen: PokemonGeneration}) {
	const battleInfo = useBattleInfo(props.gen);
	const gameState = useGameState(props.gen);
	const defaultIndex = battleInfo.type === "Trainer" ? -1 : 0;
	return (
		<div class={"opponent"}>
			<h2>
				Battle: {battleInfo.type === "Trainer" ? battleInfo.trainerName : "Wild pokemon"}
			</h2>

			<OpponentTeam 
				teamSize={battleInfo.teamSize} 
				trainer={battleInfo.type === "Trainer"} 
				currentPokemon={gameState === "Battle" ? battleInfo.currentPokemon : defaultIndex}
			/>
		</div>
	);
}
