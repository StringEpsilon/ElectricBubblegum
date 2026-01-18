import { getPropertyInvariant } from "../../functions/getPropertyInvariant";
import { gameSignal } from "../../components/GameContext";
import { dexContextSignal } from "../../components/DexContext";
import { playerStatsSignal } from "../../components/playerStatsSignal";
import { getMovePowerModifier } from "../../functions/battle/getMovePowerModifier";
import { useComputed } from "@preact/signals";
import { playerDexSignal } from "../../signals/playerDexSignal";
import { opponentDexSignal } from "../../signals/opponentDexSignal";
import { battleInfo } from "../PanelRight/useBattleInfo";
import { allBadges } from "./Badges";

export type MoveProps = {
	moveIndex: 1 | 2 | 3 | 4,
}

export function Move(props: MoveProps) {
	const dexData = playerDexSignal.value;
	const currentSpecies = useComputed(() => playerStatsSignal.value?.species);
	const heldItem = useComputed(() => playerStatsSignal.value?.heldItem);
	const opponentDexEntry =  opponentDexSignal.value;
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
	if (!currentSpecies) {
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
	
	let effectiveness = getMovePowerModifier(
		dexData, 
		heldItem.value ?? "", 
		opponentDexEntry, 
		move, 
		generation, 
		battleInfo.value.weather,
		allBadges.value
	);
	let nameStyle = (move.move === "Curse"
		? "curse"
		: move.type).toLowerCase();
	let powerColor = "";
	if (effectiveness.modifier > 1) {
		powerColor = "text-green";
	} else if (effectiveness.modifier < 1) {
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
