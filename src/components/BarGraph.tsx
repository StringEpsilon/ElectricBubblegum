
export function BarGraph(props: { label: string|number|undefined; percent: string; }) {
	return (
		<div class="bar-graph">
			{props.label}
			<div style={{ width: props.percent + "%" }}>
				&nbsp;
			</div>
		</div>
	);
}
