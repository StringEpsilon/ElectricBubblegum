import { useContext } from "preact/hooks";
import { DexContext } from "../../../components/DexContext";
import { GameContext } from "../../../components/GameContext";
import { getPropertyInvariant } from "../../../functions/getPropertyInvariant";


export function OpponentMove(props: { moveId: string | null; }) {
	const { moves } = useContext(DexContext);
	const { generation } = useContext(GameContext);
	const move = getPropertyInvariant(moves[generation], props.moveId as string ?? "");
	if (!move) {
		return <span>&nbsp;</span>;
	}

	const typeCss = (move.move === "Curse"
		? "curse"
		: move.type).toLowerCase();
	return (
		<div>
			<span class={"name color type " + typeCss}>{move.move}</span>
			<span class="accuracy">{move.accuracy ? move.accuracy + "%" : "-"}</span>
			<span class="power">{move.power ?? "-"}</span>
		</div>
	);
}
