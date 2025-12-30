
export function getPropertyInvariant<T>(object: Record<string, T>, key: string): T | null {
	const actualKey: string | undefined = Object.keys(object).find(x => x.toLowerCase() == key.toLowerCase());
	if (!actualKey) {
		return null;
	}
	return object[actualKey] ?? null;
}
