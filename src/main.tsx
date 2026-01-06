import { ContainerNode, render } from "preact";
import App from "./App.tsx";
import "./style/fonts.css";
import "./style/general.css";

render(
	<App />,
	document.getElementById("root") as ContainerNode
);
