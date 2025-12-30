import { usePropertyValue } from "../../hooks/useGameProperty";
import { getPropertyInvariant } from "../../functions/getPropertyInvariant";
import { useContext } from "preact/hooks";
import { GameContext } from "../../components/GameContext";
import typeEffectiveness from "../../data/type-effectiveness";
import { DexContext } from "../../components/DexContext";
import { PokemonDataContext } from "../../components/PartyProvider";


export type MoveProps = {
	moveIndex: 1 | 2 | 3 | 4,
}

export function Move(props: MoveProps) {
	const { current, isInBattle } = useContext(PokemonDataContext);
	const { pokedex, moves } = useContext(DexContext);
	const { generation } = useContext(GameContext);
	if (!current) {
		return;
	}
	const moveId = current[`move${props.moveIndex}`];
	const movePP = current[`move${props.moveIndex}pp`];
	const enemySpecies = usePropertyValue<string>("battle.enemyPokemon.species");

	const dexData = getPropertyInvariant(pokedex, current?.species ?? "");
	const enemyDex = getPropertyInvariant(pokedex, enemySpecies ?? "");
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
	let relativePower = move.power ?? 0;
	if (relativePower != 0 && dexData) {
		if (dexData.type_1 === move.type || dexData.type_2 === move.type) {
			relativePower *= 1.5;
		}
		if (enemyDex && isInBattle) {
			var effectiveness = typeEffectiveness.find(x => x.moveType == move.type);
			if (effectiveness) {
				relativePower *= effectiveness[enemyDex.type_1];
				if (enemyDex.type_1 != enemyDex.type_2) {
					relativePower *= effectiveness[enemyDex.type_2];
				}
			}
		}
	}
	
	const typeCss = (move.move === "Curse"
		? "curse"
		: move.type).toLowerCase();
	return (
		<tr>
			<td class={"name color type " + typeCss}>
				{move.move}
			</td>
			<td class="power">
				{relativePower ? Math.floor(relativePower) : "-"}
			</td>
			<td class="pp">
				<span class={movePP === 0 ? 'color red' : ""}>
					{movePP}
				</span>
			</td>
		</tr>
	);
}
