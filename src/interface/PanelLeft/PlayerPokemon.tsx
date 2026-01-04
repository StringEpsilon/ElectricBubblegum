import { BarGraph } from "../../components/BarGraph";
import { dexContextSignal } from "../../components/DexContext";
import { gameSignal } from "../../components/GameContext";
import { CurrentPokemon } from "../../data/CurrentPokemon";
import { getPropertyInvariant } from "../../functions/getPropertyInvariant";
import { getPartyPokemonMap } from "../../functions/mappings/getPartyPokemonMap";
import { usePropertyMap } from "../../hooks/useGameProperty";
import { PartyStat } from "./PartyStat";
import { calcXP } from "./PokemonInfo";

export function NormalizeSpecies(species: string) {
	switch (species) {
		case "Nidoran-F":
			return "Nidoran_F"
		case "Nidoran-M":
			return "NIDORAN_M"
	}
	return species.toUpperCase();
}

export function NormalizeSpeciesName(species: string) {
	switch (species) {
		case "Nidoran-F":
			return "NIDORAN♀"
		case "Nidoran-M":
			return "NIDORAN♂"
	}
	return species.toUpperCase();
}



export function PlayerPokemon(props: { index: number; }) {
	const { pokedex } = dexContextSignal.value;
	const { generation } = gameSignal.value;
	const mon = usePropertyMap<CurrentPokemon>(getPartyPokemonMap(generation === "1", false, props.index));
	const dexEntry = getPropertyInvariant(pokedex, NormalizeSpecies(mon?.species ?? ""));
	if (!mon?.species) {
		return null;
	}
	let expPercent = "0";
	let critRate = "0";
	if (dexEntry) {
		const xpNextLevel = Math.floor(calcXP(dexEntry.growth_rate, mon.level));
		if (mon.level < 100) {
			expPercent = ((mon.xp) / (xpNextLevel) * 100).toFixed(2);
		} else {
			expPercent = "100";
		}
		critRate = ((dexEntry.base_stats.speed / 2) / 256 * 100).toFixed(1);
	}
	let status = mon.hp + " HP";
	switch (mon.statusCondition) {
		case "Poisoned":
			status = "PSN";
			break;
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
				<BarGraph label={`${status}`} percent={(mon.hp / mon.maxHp * 100).toFixed(2)} />
				<BarGraph label={`Level: ${mon.level.toString().padStart(3, "\u00A0")}`} percent={expPercent} color="blue" />
			</div>
			<div>
				<div class="party-stat-block">
					<PartyStat label=" HP" value={mon.maxHp} color="hp" />
					<PartyStat label="Spd" value={mon.speed} color="speed" />
					<PartyStat label="Atk" value={mon.attack} color="attack" />
					<PartyStat label="Def" value={mon.defense} color="defense" />
					{generation === "1"
						? <>
							<PartyStat label="Spc" value={mon.specialAttack} color="specialAttack" />
							<PartyStat label="Crit" value={critRate} color="" />
						</>
						: <>
							<PartyStat label="Sp.A." value={mon.specialAttack} color="specialAttack" />
							<PartyStat label="Sp.D." value={mon.specialDefense} color="specialDefense" />
						</>}
				</div>
			</div>
		</div>
	);
}
