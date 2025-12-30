

export function TableRow(props: { title: string, children: React.ReactNode }) {
	return (
		<tr>
			<th>
				{props.title}
			</th>
			<td>
				{props.children}
			</td>
		</tr>
	);
}

