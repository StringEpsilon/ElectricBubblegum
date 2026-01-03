import { getPropertyInvariant } from "../../functions/getPropertyInvariant";
import { gameContext } from "../../components/GameContext";
import { dexContextSignal } from "../../components/DexContext";
import { opponentDexSignal, playerDexSignal, playerStatsSignal } from "../../components/PartyProvider";
import { getMovePowerModifier, getSTAB } from "../../functions/battle/getMovePowerModifier";
import { useComputed } from "@preact/signals";

export type MoveProps = {
	moveIndex: 1 | 2 | 3 | 4,
}

export function Move(props: MoveProps) {
	const dexData = playerDexSignal.value;
	const currentSpecies = useComputed(() => playerStatsSignal.value?.species);
	const opponentDexEntry = opponentDexSignal.value
	const { pokedex, moves } = dexContextSignal.value!;
	const generation = useComputed(() => gameContext.value.generation).value;
	const movePP = useComputed(() => playerStatsSignal.value 
		? playerStatsSignal.value[`move${props.moveIndex}pp`]
		: ""
	).value;
	const moveId = useComputed(() => playerStatsSignal.value 
		? playerStatsSignal.value[`move${props.moveIndex}`]
		: ""
	).value;
	if (!currentSpecies || !pokedex || !moves || !moveId) {
		return null;
	}
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
