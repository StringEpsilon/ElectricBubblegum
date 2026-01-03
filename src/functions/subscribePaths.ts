import { Store } from "../PokeAByte/PropertyStore";

export function subscribePaths(paths: string[], action: (path: string) => void) {
	const onUpdate = (path: string) => {
		if (paths.includes(path)) {
			action(path);
		}
	}
	Store.addUpdateListener(onUpdate);
	return () => Store.removeUpdateListener(onUpdate);
}