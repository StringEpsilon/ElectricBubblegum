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

	let powerModifier = getMovePowerModifier(opponentDexEntry, playerDex, move);
	let typeCss = (move.move === "Curse"
		? "curse"
		: move.type).toLowerCase();
	let powerColor = "";
	if (powerModifier > 1) {
		powerColor = "text-green";
	} else if (powerModifier < 1) {
		powerColor = "text-red";
	}
	if (getSTAB(opponentDexEntry, move) && move.power) {
		powerModifier *= 1.5;
		typeCss += " stab";
	}
	return (
		<div >
			<span class={"name color type " + typeCss}>{move.move}</span>
			<span class="accuracy">{move.accuracy ? move.accuracy + "%" : "-"}</span>
			<span class={"power " + powerColor}>
				{move.power ? Math.floor(powerModifier * move.power) : "-"}
			</span>
		</div>
	);
}
