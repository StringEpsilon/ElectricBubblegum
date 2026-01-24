import { BarGraph } from "../../components/BarGraph";
import { gameSignal } from "../../components/GameContext";
import { playerStatsSignal } from "../../components/playerStatsSignal";
import { TableRow } from "../../components/TableRow";
import { getLevelXP } from "../../functions/experience";
import { playerDexSignal } from "../../signals/playerDexSignal";
import { PartyMoves } from "./PartyMoves";
import { normalizeStatusCondition } from "./PlayerPokemon";
import { StatBlock } from "./StatBlock";

export function ActivePokemon() {
	const { generation } = gameSignal.value;
	const dexEntry = playerDexSignal.value;
	const current = playerStatsSignal.value;
	let ability: string = "";
	let critRate: string = "0.00";
	let hpPercent: string = "0.00";
	let levelXp = { current: 0, levelUp: 1 };
	if (dexEntry && current) {
		levelXp = getLevelXP(current.xp, current?.level, dexEntry?.growth_rate);
		ability = typeof current.ability === "string"
			? current.ability
			: dexEntry.abilities[current.ability ? 1 : 0];

		critRate = ((dexEntry.base_stats.speed / 2) / 256 * 100).toFixed(2);
		hpPercent = (current.hp / current.maxHp * 100).toFixed(2);
	}

	return (
		<>
			<table class="striped">
				<tbody>
					<TableRow title="Species">{dexEntry?.species ?? "No Pokemon"}</TableRow>
					<TableRow title="Health">
						<BarGraph label={current?.hp} value={current?.hp ?? 0} max={current?.maxHp ?? 1} />
					</TableRow>
					<TableRow title="Level">
						<BarGraph label={current?.level} value={levelXp.current} max={levelXp.levelUp} color="blue" />
					</TableRow>
					<StatBlock currentMon={current} critRate={critRate} />
					{generation != "1" &&
						<TableRow title="Item">{current?.heldItem ?? "-"}</TableRow>}
					{Number(generation) > 2 &&
						<TableRow title="Ability">{ability}</TableRow>}
					<TableRow title="Condition">
						{normalizeStatusCondition(current?.statusCondition ?? "") || <span class={"text-green"}>None</span>}
					</TableRow>
				</tbody>
			</table>
			<PartyMoves />
		</>
	);
}
