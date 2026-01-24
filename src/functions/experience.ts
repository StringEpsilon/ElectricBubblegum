import { GrowthRate } from "../data/DataTypes";

export function calcXP(grothRate: GrowthRate, level: number) {
	level++;
	switch (grothRate) {
		case "Fast":
			return (4 * Math.pow(level, 3)) / 5;
		case "Medium Fast":
			return Math.pow(level, 3);
		case "Medium Slow":
			return (6 / 5) * Math.pow(level, 3) - (15 * Math.pow(level, 2)) + (100 * level) - 140;
		case "Slow":
			return ((5 * Math.pow(level, 3)) / 4);
		case "Erratic":
			if (level < 50) {
				return (Math.pow(level, 3) * (100 - level)) / 50;
			}
			if (level <= 68) {
				return (Math.pow(level, 3) * (150 - level)) / 100;
			}
			if (level <= 98) {
				return (Math.pow(level, 3) * Math.floor((1911 - level * 10) / 3)) / 500;
			}
			return ((Math.pow(level, 3) * (160 - level)) / 100);
		case "Fluctuating":
			if (level < 15) {
				return (Math.pow(level, 3) * ((Math.floor((level + 1) / 3) + 24))) / 50;
			}
			if (level < 36) {
				return (Math.pow(level, 3) * (level + 14)) / 50;
			}
			return (Math.pow(level, 3) * (Math.floor(level / 2) + 32)) / 50;
	}
};

export function getLevelXP(currentXP: number, currentLevel: number, growth_rate: GrowthRate) {
	const xpNextLevel = Math.floor(calcXP(growth_rate, currentLevel));
	const xpCurrentLevel = Math.floor(calcXP(growth_rate, currentLevel-1));
	return {current: currentXP-xpCurrentLevel, levelUp: xpNextLevel-xpCurrentLevel};
}