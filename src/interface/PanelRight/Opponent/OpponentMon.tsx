import { useContext, useState } from "preact/hooks";
import { BarGraph } from "../../../components/BarGraph";
import { usePropertyMap } from "../../../hooks/useGameProperty";
import { Modifier } from "./Modifier";
import { GameContext } from "../../../components/GameContext";
import { getOpponentPokemonMap } from "../functions/getOpponentPokemonMap";
import { OpponentPokemon } from "../types/OpponentPokemon";
import { OpponentMove } from "./OpponentMove";

export function OpponentMon(props: { index: number; currentPokemon: number }) {
	const { generation } = useContext(GameContext);
	const { index, currentPokemon } = props;
	const [propertyMap] = useState(() => getOpponentPokemonMap(generation, index, index === currentPokemon))
	const mon = usePropertyMap<OpponentPokemon>(propertyMap);

	if (mon === null) {
		return null;
	}
	const applyMod = Number(generation) >= 3;
	let monClass = mon.hp > 0 ? "alive" : "defeated";
	if (currentPokemon === props.index) {
		monClass += " current";
	}
	return (
		<div class={"opponent-mon " + monClass}>
			<div>
				<BarGraph label={`Level ${mon.level} ${mon.species}`} percent={(mon.hp / mon.hpMax * 100).toFixed(0)} />
			</div>
			<div class={"opponent-mon-body"}>
				<div class="opponent-stat-block">
					<OpponentStat value={mon.hpMax} color="hp" modifier={0} applyMod={applyMod} />
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
								<span>TODO %</span>
							</div>
						</>
						: <>
							<OpponentStat value={mon.specialAttack} color="specialAttack" modifier={mon.specialAttackMod} applyMod={applyMod} />
							<OpponentStat value={mon.specialDefense} color="specialDefense" modifier={mon.specialDefenseMod} applyMod={applyMod} />
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

function OpponentStat(props: StatProps) {
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

