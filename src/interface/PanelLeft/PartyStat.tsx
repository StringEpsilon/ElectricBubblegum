
export function PartyStat(props: { value: number | string; color: string; label: string; }) {
	return (
		<div class={"box color " + props.color}>
			<div>{props.value}</div>
			<div>{props.label}</div>
		</div>
	);
}
