import "./party-moves.css";
import { Move } from "./Move";

export function PartyMoves() {
	return (
		<div>
			<h1 class="tab">Moves</h1>
			<table class="party-moves">
				<thead>
					<tr>
						<th>Name</th>
						<th>Pwr.</th>
						<th>PP</th>
					</tr>
				</thead>
				<tbody>
					<Move moveIndex={1} />
					<Move moveIndex={2} />
					<Move moveIndex={3} />
					<Move moveIndex={4} />
				</tbody>
			</table>
		</div>
	);
}
