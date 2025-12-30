import { OpponentMon } from "./OpponentMon";

export function OpponentTeam(props: { teamSize: number; trainer: boolean; currentPokemon: number; }) {
	const mons: number[] = [];
	for (let i = 0; i < props.teamSize; i++) {
		mons.push(i);
	}
	return <>
		{mons.map(i => <OpponentMon index={i} currentPokemon={props.currentPokemon} key={i} />)}
	</>;
}
