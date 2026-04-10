import { GameTime } from "./GameTime";
import { Badges } from "./Badges";
import { TableRow } from "../../components/TableRow";

export function RunInfo() {
	return (
		<div>
			<h1 class="tab active">Run</h1>
			<table class="striped">
				<tbody>
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
