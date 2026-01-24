export function BarGraph(props: { label: string|number|undefined; color?: string, value: number, max: number }) {
	const percent = Math.min(100, props.value / props.max * 100).toFixed(2);
	return (
		<div class={"bar-graph " + (props.color ? "blue" : "")}>
			<div style={{ width: percent + "%" }}>
				&nbsp;
			</div>
			<span class="bar-label">
				{props.label}
			</span>
		</div>
	);
}
