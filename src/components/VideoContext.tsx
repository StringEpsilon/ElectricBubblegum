import { createContext } from "preact";

export interface VideoContextInterface {
	source: MediaStream|null,
	requestSource: () => void,
	closeSource: () => void,
}

/**
 * Context holding the advanced mode state.
 */
export const VideoContext = createContext<VideoContextInterface>(null!);