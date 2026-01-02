import { usePropertyValue } from "../../hooks/useGameProperty";
import { getPropertyInvariant } from "../../functions/getPropertyInvariant";
import { useContext } from "preact/hooks";
import { GameContext } from "../../components/GameContext";
import { DexContext } from "../../components/DexContext";
import { PokemonDataContext } from "../../components/PartyProvider";
import { getMovePowerModifier, getSTAB } from "../../functions/battle/getMovePowerModifier";


export type MoveProps = {
	moveIndex: 1 | 2 | 3 | 4,
}

export function Move(props: MoveProps) {
	const { playerCurrent, opponentCurrent } = useContext(PokemonDataContext);
	const { pokedex, moves } = useContext(DexContext);
	const { generation } = useContext(GameContext);
	if (!playerCurrent) {
		return;
	}
	const moveId = playerCurrent[`move${props.moveIndex}`];
	const movePP = playerCurrent[`move${props.moveIndex}pp`];

	const dexData = getPropertyInvariant(pokedex, playerCurrent?.species ?? "");
	const opponentDexEntry = getPropertyInvariant(pokedex, opponentCurrent?.species ?? "");
	const move = getPropertyInvariant(moves[generation], moveId as string ?? "");
	if (!move) {
		return (
			<tr>
				<td> &nbsp; </td>
				<td> &nbsp; </td>
				<td> &nbsp; </td>
			</tr>
		);
	}
	let powerModifier = getMovePowerModifier(dexData, opponentDexEntry, move);
	let nameStyle = (move.move === "Curse"
		? "curse"
		: move.type).toLowerCase();
	let powerColor = "";
	if (powerModifier > 1) {
		powerColor = "text-green";
	} else if (powerModifier < 1) {
		powerColor = "text-red";
	}
	if (getSTAB(dexData, move) && move.power) {
		powerModifier *= 1.5;
		nameStyle += " stab";
	}
	return (
		<tr>
			<td class={"name color type " + nameStyle}>
				{move.move}
			</td>
			<td class={"power " + powerColor}>
				{move.power ? Math.floor(move.power * powerModifier) : "-"}
			</td>
			<td class="pp">
				<span class={movePP === 0 ? 'color red' : ""}>
					{movePP}
				</span>
			</td>
		</tr>
	);
}
