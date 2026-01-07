import { GrowthRate } from "../../data/DataTypes";
import { StatBlock } from "./StatBlock";
import { TableRow } from "../../components/TableRow";
import { BarGraph } from "../../components/BarGraph";
import { gameSignal } from "../../components/GameContext";
import { playerStatsSignal } from "../../components/playerStatsSignal";
import { playerDexSignal } from "../../signals/playerDexSignal";
import { PartyMoves } from "./PartyMoves";
import { PlayerParty } from "./PlayerParty";
import { signal } from "@preact/signals";
import { Shortcut, shortcutsSignal } from "../../signals/shortCutsSignal";


export const panelSignal = signal<"active" | "party">("active");

window.addEventListener("onGamepadButton", (e: any) => {
	const shortcuts = shortcutsSignal.peek()
	if (e.detail.button === shortcuts[Shortcut.pokemonInfo]) {
		console.log("Pressed assigned button " + e.detail.button);
		panelSignal.value = panelSignal.peek() === "active" ? "party" : "active";
	}
});

export function calcXP(grothRate: GrowthRate, level: number) {
	level++;
	switch (grothRate) {
		case "Fast":
			return (4 * Math.pow(level, 3)) / 5;
		case "Medium Fast":
			return Math.pow(level, 3);
		case "Medium Slow":
			return (6 / 5) * Math.pow(level, 3) - (15 * Math.pow(level, 2)) + (100 * level) - 140;
		case "Slow":
			return ((5 * Math.pow(level, 3)) / 4);
		case "Erratic":
			if (level < 50) {
				return (Math.pow(level, 3) * (100 - level)) / 50;
			}
			if (level <= 68) {
				return (Math.pow(level, 3) * (150 - level)) / 100;
			}
			if (level <= 98) {
				return (Math.pow(level, 3) * Math.floor((1911 - level * 10) / 3)) / 500;
			}
			return ((Math.pow(level, 3) * (160 - level)) / 100);
		case "Fluctuating":
			if (level < 15) {
				return (Math.pow(level, 3) * ((Math.floor((level + 1) / 3) + 24))) / 50;
			}
			if (level < 36) {
				return (Math.pow(level, 3) * (level + 14)) / 50;
			}
			return (Math.pow(level, 3) * (Math.floor(level / 2) + 32)) / 50;
	}
	return 0;
};

export function PokemonInfo() {
	
	return (
		<div>
			<div class={"tab-bar"}>
				<button
					onClick={() => panelSignal.value = "active"}
					class={"tab " + (panelSignal.value === "active" ? "active" : "")}
				>
					Active Pokemon
				</button>
				<button
					onClick={() => panelSignal.value = "party"}
					class={"tab " + (panelSignal.value === "party" ? "active" : "")}
				>
					Party
				</button>
			</div>
			{panelSignal.value === "active"
				? <ActivePokemon></ActivePokemon>
				: <PlayerParty></PlayerParty>
			}
		</div>
	);
}

export function getLevelPercentage(currentXP: number, currentLevel: number, growth_rate: GrowthRate) {
	let percent = "0";
	const xpNextLevel = Math.floor(calcXP(growth_rate, currentLevel));
	const xpCurrentLevel = Math.floor(calcXP(growth_rate, currentLevel-1));
	if (currentLevel < 100) {
		percent = ((currentXP-xpCurrentLevel) / (xpNextLevel-xpCurrentLevel) * 100).toFixed(2);
	} else {
		percent = "100";
	}
	return percent;
}

function ActivePokemon() {
	const { generation } = gameSignal.value;
	const dexEntry = playerDexSignal.value;
	const current = playerStatsSignal.value;
	let ability: string = "";
	let critRate: string = "0.00";
	let hpPercent: string = "0.00";
	let expPercent: string = "0.00";
	if (dexEntry && current) {
		expPercent = getLevelPercentage(current.xp, current.level,dexEntry?.growth_rate);
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
					<TableRow title="Species">{dexEntry?.species ?? "[No Pokemon]"}</TableRow>
					<TableRow title="Health">
						<BarGraph label={current?.hp} percent={hpPercent} />
					</TableRow>
					<TableRow title="Level">
						<BarGraph label={current?.level} percent={expPercent} color="blue" />
					</TableRow>
					<StatBlock currentMon={current} critRate={critRate} />
					{generation != "1" &&
						<TableRow title="Item">{current?.heldItem ?? "-"}</TableRow>
					}
					{Number(generation) > 2 &&
						<TableRow title="Ability">{ability}</TableRow>
					}
					<TableRow title="Condition">
						{current?.statusCondition?.trim() || <span class={"text-green"}>None</span>}
					</TableRow>
				</tbody>
			</table>
			<PartyMoves></PartyMoves>
		</>
	)
}

