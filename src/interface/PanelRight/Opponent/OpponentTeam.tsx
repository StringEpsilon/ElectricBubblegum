import { OpponentMon } from "./OpponentMon";

export function OpponentTeam(props: {  currentPokemon: number; }) {
	return <>
		<OpponentMon index={0} currentPokemon={props.currentPokemon} />
		<OpponentMon index={1} currentPokemon={props.currentPokemon} />
		<OpponentMon index={2} currentPokemon={props.currentPokemon} />
		<OpponentMon index={3} currentPokemon={props.currentPokemon} />
		<OpponentMon index={4} currentPokemon={props.currentPokemon} />
		<OpponentMon index={5} currentPokemon={props.currentPokemon} />
	</>;
}
