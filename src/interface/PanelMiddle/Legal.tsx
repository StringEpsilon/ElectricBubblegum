
export function Legal() {
	return (
		<div class="config-panel">
			<h2> Electric Bubblegum </h2>
			<p>
				Copyright 2025 - String.Epsilon
			</p>
			<p>
				This program is free software: you can redistribute it and/or modify it under the terms of the GNU
				Affero General Public License as published by the Free Software Foundation, either version 3 of the
				License, or(at your option) any later version.
			</p>
			<p>
				This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even
				the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General
				Public License for more details.
			</p>
			<p>
				You should have received a copy of the GNU Affero General Public License
				along with this program.
				If not, see  <a href="https://www.gnu.org/licenses/agpl-3.0.html/">http://www.gnu.org/licenses/agpl-3.0.html/</a>.
			</p>
			<hr />
			<h2>Third party licenses</h2>
			<p> Electric Bubblegum includes the following NPM packages: </p>
			<table class="striped">
				<thead>
					<tr>
						<th>Package</th>
						<th>Copyright</th>
						<th>License</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>preact</td>
						<td>Jason Miller</td>
						<td>MIT</td>
					</tr>
					<tr>
						<td>@microsoft/signalr</td>
						<td>Microsoft</td>
						<td>Apache-2.0</td>
					</tr>
					<tr>
						<td>Material Icons</td>
						<td>Google</td>
						<td>Apache-2.0</td>
					</tr>
					<tr>
						<td>Roboto (font)</td>
						<td>The Roboto Project Authors</td>
						<td>SIL Open Font License, Version 1.1</td>
					</tr>
					<tr>
						<td>Roboto Mono (font)</td>
						<td>Christian Robertson</td>
						<td>Apache-2.0</td>
					</tr>
					<tr>
						<td>pokeaclient</td>
						<td>String.Epsilon</td>
						<td>Apache-2.0</td>
					</tr>
				</tbody>
			</table>
			<p>
				Additionally, Electric Bubblegum reuses JavaScript and CSS written originally for Poke-A-Byte, which
				is licensed under the aGPLv3.
			</p>
			<p>
				The Pokemon move and dex data is courtesy of Scott's Thoughts.{" "}
				<a href="https://github.com/Scotts-Thoughts/data_objects">You can find the data collection here.</a>
			</p>
		</div>
	);
}
