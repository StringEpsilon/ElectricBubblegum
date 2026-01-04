
export function BarGraph(props: { label: string|number|undefined; percent: string; color?: string }) {
	return (
		<div class={"bar-graph " + (props.color ? "blue" : "")}>
			<div style={{ width: props.percent + "%" }}>
				&nbsp;
			</div>
			<span class="bar-label">
			{props.label}
			</span>
		</div>
	);
}
