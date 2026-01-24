import { BarGraph } from "../../../components/BarGraph";
import { usePropertyMap } from "../../../hooks/useGameProperty";
import { Modifier } from "./Modifier";
import { gameSignal } from "../../../components/GameContext";
import { getOpponentPokemonMap } from "../functions/getOpponentPokemonMap";
import { OpponentPokemon } from "../types/OpponentPokemon";
import { OpponentMove } from "./OpponentMove";
import { getPropertyInvariant } from "../../../functions/getPropertyInvariant";
import { dexContextSignal } from "../../../components/DexContext";
import { battleInfo } from "../useBattleInfo";
import { useComputed } from "@preact/signals";

export function OpponentMon(props: { index: number; }) {
	const currentPokemon = useComputed(() => battleInfo.value.currentPokemon).value;
	const { pokedex } = dexContextSignal.value;
	const { generation } = gameSignal.value;
	const teamSize = useComputed( () => battleInfo.value.teamSize);
	const { index } = props;
	const mon = usePropertyMap<OpponentPokemon>(getOpponentPokemonMap(generation, index, index === currentPokemon));
	const dexEntry = getPropertyInvariant(pokedex, mon?.species ?? "");
	
	if (mon === null || index > teamSize.value-1) {
		return null;
	}
	const applyMod = Number(generation) >= 3;
	let monClass = mon.hp > 0 ? "alive" : "defeated";
	if (currentPokemon === props.index) {
		monClass += " current";
	}
	let critRate = (((dexEntry?.base_stats.speed??0) / 2) / 256 * 100).toFixed(0);
	return (
		<div class={"opponent-mon " + monClass}>
			<div>
				<BarGraph label={`Level ${mon.level} ${mon.species}`} value={mon.hp} max={mon.maxHp} />
			</div>
			<div class={"opponent-mon-body"}>
				<div class="opponent-stat-block">
					<OpponentStat value={mon.maxHp} color="hp" modifier={0} applyMod={applyMod} />
					<OpponentStat value={mon.speed} color="speed" modifier={mon.speedMod} applyMod={applyMod} />
					<OpponentStat value={mon.attack} color="attack" modifier={mon.attackMod} applyMod={applyMod} />
					<OpponentStat value={mon.defense} color="defense" modifier={mon.defenseMod} applyMod={applyMod} />
					{generation === "1"
						? <>
							<div class="box color specialAttack">
								<Modifier value={mon.specialAttackMod} isActive={currentPokemon == props.index} />
								<span>{mon.specialAttack}</span>
							</div>
							<div class="box color crit">
								<Modifier value={0} isActive={false} />
								<span>~{critRate}%</span>
							</div>
						</>
						: <>
							<OpponentStat 
								value={mon.specialAttack} 
								color="specialAttack" 
								modifier={mon.specialAttackMod} 
								applyMod={applyMod} 
							/>
							<OpponentStat 
								value={mon.specialDefense} 
								color="specialDefense" 
								modifier={mon.specialDefenseMod} 
								applyMod={applyMod} 
							/>
						</>
					}
				</div>
				<div class="opponent-moves box">
					<OpponentMove moveId={mon.move1} attacker={mon.species} />
					<OpponentMove moveId={mon.move2} attacker={mon.species} />
					<OpponentMove moveId={mon.move3} attacker={mon.species} />
					<OpponentMove moveId={mon.move4} attacker={mon.species} />
				</div>
			</div>
		</div>
	);
}

type StatProps = {
	applyMod: boolean,
	value: number,
	modifier: number,
	color: string
}

export function OpponentStat(props: StatProps) {
	let value = props.value;
	if (props.applyMod) {
		if (props.modifier < 0) {
			value = Math.floor(value * (2 / (2 + (Math.abs(props.modifier)))));
		}
		if (props.modifier > 0) {
			value = value * (2+Number(props.modifier))/2
		}
	}
	return (
		<div class={"box color " + props.color}>
			<Modifier value={props.modifier} isActive={true} />
			<span>{value}</span>
		</div>
	);
}

