import { PlayerPokemon } from "./PlayerPokemon";


export function PlayerParty() {
	return (
		<div class={"player-party"}>
			{[0, 1, 2, 3, 4, 5].map(i => <PlayerPokemon index={i} />)}
		</div>
	);
}
