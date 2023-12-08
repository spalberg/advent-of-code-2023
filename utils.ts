export function notImplemented(): never {
	throw new Error('Not implemented');
}

export function tap<T>(item: T): T {
	console.log(item);
	return item;
}

export function tapF<T>(f: (item: T) => unknown): (item: T) => T {
	return (item) => {
		console.log(f(item));
		return item;
	};
}

export function parseInt(input: string): number {
	return Number.parseInt(input.trim(), 10);
}
