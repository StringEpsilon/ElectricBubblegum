import { effect, signal } from "@preact/signals";
import { Store } from "../PokeAByte/PropertyStore";
import { subscribePaths } from "./subscribePaths";

function defaultTransformer<T,T2=T>(x: T|undefined) { return  x };

export function propertySignal<T, T2 = T>(path: string, transformer?: (x: T|undefined) => T2 ) {
	if (!transformer) {
		transformer = defaultTransformer as (x:T|undefined) => T2;
	}
	const item = signal(transformer(Store.getProperty<T>(path)?.value));
	subscribePaths([path], () => item.value = transformer(Store.getProperty<T>(path)?.value));
	return item;
}
