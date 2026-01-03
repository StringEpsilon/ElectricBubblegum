import { subscribePaths } from "../functions/subscribePaths";
import { Store } from "../PokeAByte/PropertyStore";
import { useEffect, useRef, useState } from "preact/hooks";

export function mapPropertyObject<T>(map: PropertyMap<T>) {
	const properties = Store.getAllProperties();
	const data = {} as T
	Object.getOwnPropertyNames(map).forEach((key) => {
		const path = map[key as keyof T];
		data[key as keyof T] = properties[path]?.value ?? null;
	});
	return data;
}

export type PropertyMap<T> = Record<keyof T, string>;

function shallowCompare<T extends object>(a: T, b: T) {
	if (a === b) {
		return true;
	}
	if (a === null) {
		return true;
	}
	const keys1 = Reflect.ownKeys(a);
	return keys1.every(key => a[key as keyof T] === b[key as keyof T]);
}

export function usePropertyMap<T>(map: PropertyMap<T>): T | null {
	const oldMap = useRef<PropertyMap<T>>(null!);
	const [data, setData] = useState<T>(() => mapPropertyObject(map));
	
	useEffect(() => {
		if (!shallowCompare(oldMap.current, map)) {
			console.log("new map", map);
			const entries: string[] = [];
			Object.getOwnPropertyNames(map).forEach((key) => {
				const entry = map[key as keyof T];
				entries.push(entry);
			});
			const onPropertyChange = () => {
				setData(mapPropertyObject(map));
			}
			oldMap.current = map;
			return subscribePaths(entries, onPropertyChange);
		}
	})
	return data;
}