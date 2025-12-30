
export function Modifier(props: { isActive: boolean; value: number; }) {
	if (!props.isActive || Number(props.value) === 0) {
		return <span></span>;
	}
	if (Number(props.value) > 0) {
		return <span class={"text-green"}>+{props.value}</span>;
	}
	return <span class={"text-red"}>{props.value}</span>;
}
