import { signal } from "@preact/signals";
import { GameState } from "../data/GameState";
import { Store } from "../PokeAByte/PropertyStore";

export const getGameState = () => Store.getProperty<GameState>("meta.state")?.value ?? "No Pokemon";
export const gameState = signal<GameState>(getGameState());

