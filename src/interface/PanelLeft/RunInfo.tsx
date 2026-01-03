import { GameTime } from "./GameTime";
import { Badges } from "./Badges";
import { gameContext } from "../../components/GameContext";
import { TableRow } from "../../components/TableRow";

export function RunInfo() {
	const { game } = gameContext.value;
	return (
		<div>
			<h1 class="tab">Run</h1>
			<table class="striped">
				<tbody>
					<TableRow title="Game">
						{game}
					</TableRow>
					<TableRow title="IGT">
						<GameTime />
					</TableRow>
					<TableRow title="Badges">
						<Badges />
					</TableRow>
				</tbody>
			</table>
		</div>
	);
}
