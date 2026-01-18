import { getPropertyInvariant } from "../../functions/getPropertyInvariant";
import { gameSignal } from "../../components/GameContext";
import { dexContextSignal } from "../../components/DexContext";
import { battlePokemon, playerStatsSignal } from "../../components/playerStatsSignal";
import { getMovePowerModifier } from "../../functions/battle/getMovePowerModifier";
import { useComputed } from "@preact/signals";
import { battleInfo } from "../PanelRight/useBattleInfo";
import { allBadges } from "./Badges";

export type MoveProps = {
	moveIndex: 1 | 2 | 3 | 4,
}

export function Move(props: MoveProps) {
	const { moves } = dexContextSignal.value!;
	const generation = useComputed(() => gameSignal.value.generation).value;
	const movePP = useComputed(() => playerStatsSignal.value 
		? playerStatsSignal.value[`move${props.moveIndex}pp`]
		: ""
	).value;
	const moveId = useComputed(() => playerStatsSignal.value 
		? playerStatsSignal.value[`move${props.moveIndex}`]
		: ""
	).value;

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
	
	let effectiveness = getMovePowerModifier(
		battlePokemon.value.player, 
		battlePokemon.value.opponent, 
		move, 
		generation, 
		battleInfo.value.weather,
		allBadges.value
	);
	let nameStyle = (move.move === "Curse"
		? "curse"
		: move.type).toLowerCase();
	let powerColor = "";
	if (effectiveness.typeBonus > 1) {
		powerColor = "text-green";
	} else if (effectiveness.typeBonus < 1) {
		powerColor = "text-red";
	}
	if (effectiveness.isSTAB) {
		nameStyle += " stab";
	}
	let power: string|null = "-";
	if (effectiveness.power !== null && !effectiveness.isFixed) {
		power = effectiveness.power.toString();
	} else if (effectiveness.isFixed) {
		power = "fix"
	}
	
	return (
		<tr title={move.type + " / " + move.category + " - " + move.description}>
			<td class={"name color type " + nameStyle}>
				{move.move}
			</td>
			<td class={"power " + powerColor}>
				{power}
			</td>
			<td class="pp">
				<span class={movePP === 0 ? 'color red' : ""}>
					{movePP}
				</span>
			</td>
		</tr>
	);
}
