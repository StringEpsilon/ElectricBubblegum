import { Store } from "../PokeAByte/PropertyStore";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";


export function usePropertyValue<T>(path: string): T | null {
	const [property, setProperty] = useState<T|null>(() => Store.getProperty(path)?.value ?? null);
	useEffect(
		() => {
			const callback = (updatedPath: string) => {
				if (updatedPath === path) {
					setProperty(Store.getProperty(path)?.value ?? null)
				}
			};
			Store.addUpdateListener(callback);
			return () => Store.removeUpdateListener(callback);
		},
		[path]
	);
	return property;
}

export function mapPropertyObject<T>(map: PropertyMap<T>) {
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
	const [data, setData] = useState<T>(() => mapPropertyObject(map));
	const ref = useRef<T | null>(null);
	
	useEffect(() => {
		const reverseMap: Record<string, keyof T> = {};
		Object.getOwnPropertyNames(map).forEach((key) => {
			const entry = map[key as keyof T];
			reverseMap[entry] = key as keyof T;
		});
		const onPropertyChange = (path: string) => {
			const propertyKey = reverseMap[path];
			if (!propertyKey) {
				return;
			}
			const property = Store.getProperty(path);
			if (ref.current && ref.current[propertyKey as keyof T] === property?.value) {
				return;
			}
			if (!ref.current) {
				ref.current = {} as T;
			}
			ref.current[propertyKey as keyof T] = property?.value
			setData({
				...data,
				[propertyKey]: property?.value,
			});
		}
		Store.addUpdateListener(onPropertyChange);
		return () => Store.removeUpdateListener(onPropertyChange);
	}, [map])
	return data;
}