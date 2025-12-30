import { GameTime } from "./GameTime";
import { Badges } from "./Badges";
import { GameContext } from "../../components/GameContext";
import { useContext } from "preact/hooks";
import { TableRow } from "../../components/TableRow";

export function RunInfo() {
	const { game } = useContext(GameContext);
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
