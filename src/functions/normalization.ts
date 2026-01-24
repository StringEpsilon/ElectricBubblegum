export function NormalizeSpecies(species: string) {
	switch (species) {
		case "Nidoran-F":
			return "Nidoran_F"
		case "Nidoran-M":
			return "NIDORAN_M"
	}
	return species.toUpperCase();
}

export function NormalizeSpeciesName(species: string) {
	switch (species) {
		case "Nidoran-F":
			return "NIDORAN♀"
		case "Nidoran-M":
			return "NIDORAN♂"
	}
	return species.toUpperCase();
}