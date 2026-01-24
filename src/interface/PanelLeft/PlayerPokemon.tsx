import { BarGraph } from "../../components/BarGraph";
import { dexContextSignal } from "../../components/DexContext";
import { gameSignal } from "../../components/GameContext";
import { CurrentPokemon } from "../../data/CurrentPokemon";
import { getLevelXP } from "../../functions/experience";
import { getPropertyInvariant } from "../../functions/getPropertyInvariant";
import { getPartyPokemonMap } from "../../functions/mappings/getPartyPokemonMap";
import { NormalizeSpecies, NormalizeSpeciesName } from "../../functions/normalization";
import { usePropertyMap } from "../../hooks/useGameProperty";
import { PartyStat } from "./PartyStat";



export function PlayerPartyPokemon(props: { index: number; }) {
	const { pokedex } = dexContextSignal.value;
	const { generation } = gameSignal.value;
	const mon = usePropertyMap<CurrentPokemon>(getPartyPokemonMap(generation === "1", false, props.index));
	const dexEntry = getPropertyInvariant(pokedex, NormalizeSpecies(mon?.species ?? ""));
	if (!mon?.species || !dexEntry) {
		return null;
	}
	let critRate = ((dexEntry.base_stats.speed / 2) / 256 * 100).toFixed(1);
	let levelXp = getLevelXP(mon.xp, mon.level, dexEntry.growth_rate);
	let status = mon.hp + " HP";
	if (mon.statusCondition) {
		status += " (" +normalizeStatusCondition(mon.statusCondition) + ")"
	}
	let name = "";
	if (NormalizeSpeciesName(mon.species) === mon.nickname) {
		name = dexEntry?.species ?? mon.species;
	} else {
		name = `${mon.nickname} (${mon.species})`;
	}
	return (
		<div class={"party-mon-body"}>
			<div class={""}>
				{props.index + 1}: {name}
			</div>
			<div class="party-mon-header">
				<BarGraph label={`${status}`} value={mon.hp} max={mon.maxHp} />
				<BarGraph 
					label={`Level: ${mon.level.toString().padStart(3, "\u00A0")}`} 
					value={levelXp.current} 
					max={levelXp.levelUp} 
					color="blue" 
				/>
			</div>
			<div>
				<div class="party-stat-block">
					<PartyStat label=" HP" value={mon.maxHp} color="hp" />
					<PartyStat label="Spd" value={mon.speed} color="speed" />
					<PartyStat label="Atk" value={mon.attack} color="attack" />
					<PartyStat label="Def" value={mon.defense} color="defense" />
					<PartyStat label={generation === "1" ? "Spc": "Sp.A."} value={mon.specialAttack} color="specialAttack" />
					{ generation === "1"
						? <PartyStat label="Crit" value={critRate} color="" />
						: <PartyStat label="Sp.D." value={mon.specialDefense} color="specialDefense" />
					}
				</div>
			</div>
		</div>
	);
}

export function normalizeStatusCondition(condition: string) {
	switch (condition) {
		case "SLP":
			return "Asleep";
		case "PSN":
			return "Poisoned";
		case "BRN":
			return "Burned";
		case "FRZ":
			return "Frozen";
		case "PRZ":
			return "Paralyzed";
	}
}