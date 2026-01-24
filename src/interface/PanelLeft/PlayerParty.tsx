import { PlayerPartyPokemon } from "./PlayerPokemon";

export function PlayerParty() {
	return (
		<div class={"player-party"}>
			{[0, 1, 2, 3, 4, 5].map(i => <PlayerPartyPokemon index={i} />)}
		</div>
	);
}
