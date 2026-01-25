import "./stat-block.css";
import { CurrentPokemon } from "../../data/CurrentPokemon";
import { TableRow } from "../../components/TableRow";
import { gameSignal } from "../../components/GameContext";
import { battlePokemon } from "../../components/playerStatsSignal";
import { badgeSignal } from "./Badges";
import { applyAbilities, applyBadgeBoosts, applyItemStatModifier, applyStageModifiers, applyStatusConditionModifier } from "../../functions/battle/statFunctions";
import { battleInfo } from "../PanelRight/useBattleInfo";

type Props = { currentMon: CurrentPokemon | null; critRate: string };

export function StatBlock({ currentMon, critRate }: Props) {
	const { generation } = gameSignal.value;
	let stats = applyStageModifiers(currentMon, generation);
	if (generation !==  "1" && generation !== "2") {
		stats = applyItemStatModifier(battlePokemon.value.player, stats, generation);
		stats = applyStatusConditionModifier(battlePokemon.value.player, stats);
		stats = applyAbilities(
			battlePokemon.value.player,
			stats,
			battlePokemon.value.opponent,
			battleInfo.value.weather,
		);
		stats = applyBadgeBoosts(stats, badgeSignal.value, generation);
	}
	return (
		<TableRow title="Stats">
			<div class="stat-block">
				<StatBox label="HP" value={currentMon?.maxHp} color="hp" />
				<StatBox label="SPD" value={stats?.speed} mod={currentMon?.speedMod} color="speed" />
				<StatBox label="ATK" value={stats?.attack} mod={currentMon?.attackMod} color="attack" />
				<StatBox label="DEF" value={stats?.defense} mod={currentMon?.defenseMod} color="defense" />
				{generation == "1"
					? <>
						<StatBox label="SPC" value={stats?.specialAttack} mod={currentMon?.specialAttackMod} color="specialAttack" />
						<StatBox label="Crit" value={`${critRate}%`} color="crit" />
					</>
					: <>
						<StatBox label="Sp.A" value={stats?.specialAttack} mod={currentMon?.specialAttackMod} color="specialAttack" />
						<StatBox label="Sp.D" value={stats?.specialDefense} mod={currentMon?.specialDefenseMod} color="specialDefense" />
					</>
				}
			</div>
		</TableRow>
	);
}

type StatBlockProps = {
	value: string | number | undefined,
	mod?: number | null,
	label: string,
	color: string,
}

function StatBox(props: StatBlockProps) {
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
			<span>{props.value}</span>
			<span>{props.label}</span>
		</div>
	);
}
