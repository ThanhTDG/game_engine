export function Singleton<T extends { new (...args: any[]): {} }>(
	constructor: T
) {
	let instance: InstanceType<T> | null = null;
	return class extends constructor {
		constructor(...args: any[]) {
			if (!instance) {
				super(...args);
				instance = this as InstanceType<T>;
			}
			return instance;
		}
	};
}
