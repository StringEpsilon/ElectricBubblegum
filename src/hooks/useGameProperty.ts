import { Store } from "../PokeAByte/PropertyStore";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";


export function usePropertyValue<T>(path: string): T | null {
	const [data, setData] = useState<T|null>(() => Store.getProperty(path)?.value)

	// Cache the result of the store snapshot function (getProperty) to avoid unncessary updates:
	const onUpdate = useCallback((updatedPath: string) => {
		if (updatedPath === path) {
			setData(Store.getProperty<T>(path)?.value ?? null);
		}
	}, [path])

	useEffect(() => {
		Store.addUpdateListener(onUpdate);
		return () => Store.removeUpdateListener(onUpdate);
	}, [path]);
	return data;
}

function initializePropertyMap<T>(map: PropertyMap<T>) {
	const properties = Store.getAllProperties();
	const data = {} as T
	Object.getOwnPropertyNames(map).forEach((key) => {
		const path = map[key as keyof T];
		data[key as keyof T] = properties[path]?.value;
	});
	return data;
}

export type PropertyMap<T> = Record<keyof T, string>;

export function usePropertyMap<T>(map: PropertyMap<T>): T | null {
	const [data, setData] = useState<T>(() => initializePropertyMap(map));
	const ref = useRef<T | null>(null);
	const [reverseMap, setReverseMap] = useState<Record<string, keyof T>>({});

	useEffect(() => {
		const newReverseMap: Record<string, keyof T> = {};
		Object.getOwnPropertyNames(map).forEach((key) => {
			const entry = map[key as keyof T];
			newReverseMap[entry] = key as keyof T;
		});
		setReverseMap(newReverseMap);
	}, [map]);

	const onPropertyChange = useCallback((path: string) => {
		const propertyKey = reverseMap[path];
		if (!propertyKey) {
			return;
		}
		const property = Store.getProperty(path);
		if (ref.current && ref.current[propertyKey as keyof T] === property?.value) {
			return;
		}
		setData({
			...data,
			[propertyKey]: property?.value,
		});
	}, [reverseMap]);

	useEffect(() => {
		Store.addUpdateListener(onPropertyChange);
		return () => Store.removeUpdateListener(onPropertyChange);
	}, [onPropertyChange])
	return data;
}