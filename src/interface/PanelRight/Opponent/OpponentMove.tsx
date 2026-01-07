import { dexContextSignal } from "../../../components/DexContext";
import { gameSignal } from "../../../components/GameContext";
import { getPropertyInvariant } from "../../../functions/getPropertyInvariant";
import { getMovePowerModifier, getSTAB } from "../../../functions/battle/getMovePowerModifier";
import { playerDexSignal } from "../../../signals/playerDexSignal";

export function OpponentMove(props: { moveId: string | null; attacker: string }) {
	const { generation } = gameSignal.value;
	const { pokedex, moves } = dexContextSignal.value;
	const playerDex = playerDexSignal.value;
	const opponentDexEntry = getPropertyInvariant(pokedex, props.attacker ?? "");
	const move = getPropertyInvariant(moves[generation], props.moveId as string ?? "");
	if (!move) {
		return <span>&nbsp;</span>;
	}

	let effectiveness = getMovePowerModifier(opponentDexEntry,playerDex, move);
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
		<div >
			<span class={"name color type " + nameStyle}>{move.move}</span>
			<span class="accuracy">{move.accuracy ? move.accuracy + "%" : "-"}</span>
			<span class={"power " + powerColor}>{power}</span>
		</div>
	);
}
