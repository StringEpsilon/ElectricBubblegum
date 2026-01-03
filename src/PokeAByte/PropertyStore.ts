import { ChangedField, GameProperty, PokeAClient } from "pokeaclient";

type Callback = () => void;
type UpdateCallback = (path: string) => void;

/**
 * This class is courtesy of Poke-A-Byte, https://github.com/PokeAByte/PokeAByte
 */
export class PropertyStore {
	private _connectionSubscriber: ((connected: boolean) => void)[] = [];
	private _mapperSubscriber: Callback[] = [];
	private _updateListener: UpdateCallback[] = [];
	client: PokeAClient;

	/**
	 * Creates an instance of PropertyStore.
	 */
	constructor() {
		this.client = new PokeAClient({
			onMapperChange: this.onMapperChange,
			onPropertyChange: this.onPropertiesChange,
			onConnectionChange: this.onConnectionChange,
		}, {
			updateOn: [ChangedField.value]
		});
		this.client.connect();
	}

	addUpdateListener = (callback: UpdateCallback) => {
		this._updateListener.push(callback);
		console.log(this._updateListener.length);
	}

	removeUpdateListener = (callback: UpdateCallback) => {
		this._updateListener = this._updateListener.filter(x => x !== callback);
	}

	onPropertiesChange = (path: string) => {
		this._updateListener.forEach(callback => callback(path));
	}

	onMapperChange = () => {
		this._mapperSubscriber.forEach(callback => callback());
		console.log(this.getMapper()?.id);
		window.requestAnimationFrame(() => {

			Object.keys(this.getAllProperties()).forEach(this.onPropertiesChange);
		});

	}

	onConnectionChange = (connected: boolean) => {
		this._connectionSubscriber.forEach(callback => callback(connected));
	}

	subscribeMapper = (onStoreChange: () => void) => {
		this._mapperSubscriber.push(onStoreChange)
		return () => {
			this._mapperSubscriber = this._mapperSubscriber.filter(x => x != onStoreChange);
		}
	}

	subscribeConnected = (onConnectedChange: () => void) => {
		this._connectionSubscriber.push(onConnectedChange);
		return () => {
			this._connectionSubscriber = this._connectionSubscriber.filter(x => x != onConnectedChange);
		}
	}
	isConnected = () => this.client.isConnected();
	getMapper = () => this.client.getMapper();
	getProperty = <T = any>(path: string) => this.client.getProperty<T>(path);
	getAllProperties = (): Record<string, GameProperty> => this.client["_properties"];
}

export const Store = new PropertyStore(); 