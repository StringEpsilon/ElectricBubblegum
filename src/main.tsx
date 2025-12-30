import { ContainerNode, render } from "preact";
import App from "./App.tsx";
import "./style/fonts.css";
import "./style/general.css";
import { VideoContext } from "./components/VideoContext.tsx";
import { useCallback, useState } from "preact/hooks";

const VideoContextProvider = (props: {children: React.ReactNode}) => {
	const [source, setVideoSource] = useState<MediaStream|null>(null)
	const requestSource = useCallback(() => {
		navigator.mediaDevices
			.getDisplayMedia({
				audio: false,
				video: { frameRate: 60 }
			})
			.then((stream:MediaStream) => {
				// There's probably a better way, but I could not find it.
				const interval = setInterval(() => {
					if (!stream.active) {
						setVideoSource(null)
						clearTimeout(interval);
					}
				}, 100);
				stream.addEventListener("stop", () => setVideoSource(null));
				setVideoSource(stream);

			})
			.catch(e => console.log(e))
	}, []);
	const closeSource = () => {
		source?.getTracks().forEach(x => x.stop());
		setVideoSource(null);
	}

	return (
		<VideoContext.Provider value={{requestSource, source, closeSource}} >
			{props.children}
		</VideoContext.Provider>
	)
}

render(
	
	<VideoContextProvider>
		<App/>
	</VideoContextProvider>,
	document.getElementById("root") as ContainerNode
)
