export function gcd(a: number, b: number): number {
	return b === 0 ? a : gcd(b, a % b);
}

export function lcm(a: number, b: number): number {
	return (a * b) / gcd(a, b);
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

export function notNull<T>(item: T | null | undefined): item is T {
	return item != null;
}

export function toInt(input: string): number {
	return Number.parseInt(input.trim(), 10);
}

export function memo<Args extends Array<unknown>, Result>(
	fn: (...args: Args) => Result,
): (...args: Args) => Result {
	const cache = new Map<string, Result>();
	return (...args) => {
		const key = JSON.stringify(args);
		if (cache.has(key)) return cache.get(key)!;
		const result = fn(...args);
		cache.set(key, result);
		return result;
	};
}

declare global {
	interface Window {
		__DEBUG__: boolean;
	}
}

export function setDebug(debug: boolean) {
	window.__DEBUG__ = debug;
}

export function isDebug() {
	return window.__DEBUG__;
}
