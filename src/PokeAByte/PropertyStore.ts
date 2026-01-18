import { ChangedField, GameProperty, PokeAClient } from "pokeaclient";

type Callback = () => void;
type UpdateCallback = (path: string) => void;

/**
 * This class is courtesy of Poke-A-Byte, https://github.com/PokeAByte/PokeAByte
 */
export class PropertyStore {
	#connectionSubscriber: ((connected: boolean) => void)[] = [];
	#mapperSubscriber: Callback[] = [];
	#updateListener: UpdateCallback[] = [];
	client: PokeAClient;

	/**
	 * Creates an instance of PropertyStore.
	 */
	constructor() {
		this.client = new PokeAClient({
			onMapperChange: this.#onMapperChange,
			onPropertyChange: this.onPropertiesChange,
			onConnectionChange: this.#onConnectionChange,
		}, {
			updateOn: [ChangedField.value]
		});
		this.client.connect();
	}

	addUpdateListener = (callback: UpdateCallback) => {
		this.#updateListener.push(callback);
	}

	removeUpdateListener = (callback: UpdateCallback) => {
		this.#updateListener = this.#updateListener.filter(x => x !== callback);
	}

	onPropertiesChange = (path: string) => {
		this.#updateListener.forEach(callback => callback(path));
	}

	#onMapperChange = () => {
		this.#mapperSubscriber.forEach(callback => callback());
		window.requestAnimationFrame(() => {
			Object.keys(this.getAllProperties()).forEach(this.onPropertiesChange);
		});
	}

	#onConnectionChange = (connected: boolean) => {
		this.#connectionSubscriber.forEach(callback => callback(connected));
	}

	subscribeMapper = (onStoreChange: () => void) => {
		this.#mapperSubscriber.push(onStoreChange)
		return () => {
			this.#mapperSubscriber = this.#mapperSubscriber.filter(x => x != onStoreChange);
		}
	}

	subscribeConnected = (onConnectedChange: () => void) => {
		this.#connectionSubscriber.push(onConnectedChange);
		return () => {
			this.#connectionSubscriber = this.#connectionSubscriber.filter(x => x != onConnectedChange);
		}
	}
	isConnected = () => this.client.isConnected();
	getMapper = () => this.client.getMapper();
	getProperty = <T = any>(path: string) => this.client.getProperty<T>(path);
	getAllProperties = (): Record<string, GameProperty> => this.client.properties;
}

export const Store = new PropertyStore();