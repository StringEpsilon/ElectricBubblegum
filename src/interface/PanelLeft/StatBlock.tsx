import "./stat-block.css";
import { CurrentPokemon } from "../../data/CurrentPokemon";
import { TableRow } from "../../components/TableRow";
import { gameContext } from "../../components/GameContext";

type Props = { currentMon: CurrentPokemon | null; critRate: string };

export function StatBlock({ currentMon, critRate }: Props) {
	const { generation } = gameContext.value;
	const applyMod = Number(generation) >= 3;
	return (
		<TableRow title="Stats">
			<div class="stat-block">
				<StatBox label="HP" value={currentMon?.maxHp} color="hp" applyMod={applyMod} />
				<StatBox label="SPD" value={currentMon?.speed} mod={currentMon?.speedMod} color="speed" applyMod={applyMod} />
				<StatBox label="ATK" value={currentMon?.attack} mod={currentMon?.attackMod} color="attack" applyMod={applyMod} />
				<StatBox label="DEF" value={currentMon?.defense} mod={currentMon?.defenseMod} color="defense" applyMod={applyMod} />
				{generation == "1"
					? <>
						<StatBox label="SPC" value={currentMon?.specialAttack} mod={currentMon?.specialAttackMod} color="specialAttack" />
						<StatBox label="Crit" value={`${critRate}%`} color="crit" />
					</>
					: <>
						<StatBox label="Sp.A" value={currentMon?.specialAttack} mod={currentMon?.specialAttackMod} color="specialAttack" />
						<StatBox label="Sp.D" value={currentMon?.specialDefense} mod={currentMon?.specialDefenseMod} color="specialDefense" />
					</>
				}
			</div>
		</TableRow>
	);
}

type StatBlockProps = {
	value: string | number | undefined,
	mod?: number,
	label: string,
	color: string,
	applyMod?: boolean
}

function StatBox(props: StatBlockProps) {
	let value: Number | string | undefined;
	if (props.applyMod && props.mod) {
		if (props.mod > 0) {
			value = Number(props.value) * (2 + Number(props.mod)) / 2
		}
		if (props.mod < 0) {
			value = Math.floor(Number(props.value) * (2 / (2 + (Math.abs(props.mod)))));
		}
	} else {
		value = props.value;
	}
	return (
		<div class={`box color ${props.color}`}>
			{(props.mod ?? 0) >= 1
				? <span class={"modifier text-green"}>+{props.mod}</span>
				: null
			}
			{(props.mod ?? 0) <= -1
				? <span class={"modifier text-red"}>{props.mod}</span>
				: null
			}
			{(props.mod ?? 0) == 0 &&
				<span class={"modifier"}></span>
			}
			<span>{value}</span>
			<span>{props.label}</span>
		</div>
	);
}