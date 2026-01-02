import { useContext } from "preact/hooks";
import { DexContext } from "../../../components/DexContext";
import { GameContext } from "../../../components/GameContext";
import { getPropertyInvariant } from "../../../functions/getPropertyInvariant";
import { getMovePowerModifier, getSTAB } from "../../../functions/battle/getMovePowerModifier";
import { PokemonDataContext } from "../../../components/PartyProvider";


export function OpponentMove(props: { moveId: string | null; attacker: string }) {
	const { generation } = useContext(GameContext);
	const { pokedex, moves } = useContext(DexContext);
	const { playerCurrent: current } = useContext(PokemonDataContext);
	const playerDex = getPropertyInvariant(pokedex, current?.species ?? "");
	const opponentDex = getPropertyInvariant(pokedex, props.attacker);
	const move = getPropertyInvariant(moves[generation], props.moveId as string ?? "");
	if (!move) {
		return <span>&nbsp;</span>;
	}

	let powerModifier = getMovePowerModifier(opponentDex, playerDex, move);
	let typeCss = (move.move === "Curse"
		? "curse"
		: move.type).toLowerCase();
	let powerColor = "";
	if (powerModifier > 1) {
		powerColor = "text-green";
	} else if (powerModifier < 1) {
		powerColor = "text-red";
	}
	if (getSTAB(opponentDex, move) && move.power) {
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
