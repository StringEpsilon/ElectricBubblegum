import { OpponentTeam } from "./OpponentTeam";
import { GameState } from "../../../data/GameState";

type Props = {
	teamIndex: number, 
	name: string | null,
	gameState: GameState
}

export function Opponent(props: Props) {
	const defaultIndex = -1;
	return (
		<div class={"opponent"}>
			<h2>
				Battle: {props.name}
			</h2>
			<OpponentTeam currentPokemon={props.teamIndex}/>
		</div>
	);
}
