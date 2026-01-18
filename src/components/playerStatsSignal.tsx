import { batch, effect, signal } from "@preact/signals";
import { BattlePokemon, CurrentPokemon } from "../data/CurrentPokemon";
import { gameSignal } from "./GameContext";
import { gameState } from "../data/gameState";
import { playerTeamPosition } from "../signals/playerTeamPosition";
import { getPartyPokemonMap } from "../functions/mappings/getPartyPokemonMap";
import { mapPropertyObject, PropertyMap } from "../hooks/useGameProperty";
import { subscribePaths } from "../functions/subscribePaths";
import { getPropertyInvariant } from "../functions/getPropertyInvariant";
import { dexContextSignal } from "./DexContext";
import { opponenStatsSignal } from "./PartyProvider";

export const playerStatsSignal = signal<CurrentPokemon | null>(null);

export const battlePokemon = signal<{player: BattlePokemon|null, opponent: BattlePokemon|null}>({
	player: null,
	opponent: null,
});

type normalizablePokemon = Omit<CurrentPokemon, "nickname"|"xp"|"move1pp"|"move2pp"|"move3pp"|"move4pp">

export function normalizeActivePokemon(pokemon: normalizablePokemon|null): BattlePokemon|null {
	if (!pokemon || !dexContextSignal.peek()) {
		return null;
	}
	var species =  getPropertyInvariant(dexContextSignal.peek().pokedex, pokemon.species ?? "");
	if (!species) {
		return null;
	}
	let ability = typeof pokemon.ability === "string"
		? pokemon.ability
		: species.abilities[pokemon.ability ? 1 : 0];
	return {
		dexData: species,
		ability: ability,
		friendship: pokemon.friendship,
		type_1: pokemon.type_1 ?? species.type_1,
		type_2: pokemon.type_2 ?? species.type_2,
		stats: {
			hp: pokemon.hp,
			maxHp: pokemon.maxHp,
			attack: pokemon.attack,
			defense: pokemon.defense,
			speed: pokemon.speed,
			specialAttack: pokemon.specialAttack,
			specialDefense: pokemon.specialDefense,
		},
		modifiers: {
			attackMod: pokemon.attackMod,
			defenseMod: pokemon.defenseMod,
			speedMod: pokemon.speedMod,
			specialAttackMod: pokemon.specialAttackMod,
			specialDefenseMod: pokemon.specialDefenseMod,
		},
		heldItem: pokemon.heldItem ?? "",
		level: pokemon.level ?? "",
	}
}

batch(() => {
	effect(() => {
		if (gameState.value === "No Pokemon") {
			return;
		}
		const generation = gameSignal.value.generation;
		const map = getPartyPokemonMap(
			generation === "1",
			gameState.value === "Battle" || gameState.value === "From Battle",
			playerTeamPosition.value
		);
		
		if (map !== null) {
			const entries: string[] = [];
			Object.getOwnPropertyNames(map).forEach((key) => {
				entries.push(map[key as keyof PropertyMap<CurrentPokemon>]);
			});
			const updateSignals = ()=> {
				playerStatsSignal.value = mapPropertyObject(map);
				battlePokemon.value = {
					opponent: normalizeActivePokemon(opponenStatsSignal.value),
					player: normalizeActivePokemon(playerStatsSignal.value),
				}
			}
			updateSignals();
			return subscribePaths(entries, updateSignals);
		}
	});
});
