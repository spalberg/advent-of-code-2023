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

export function parseInt(input: string): number {
	return Number.parseInt(input.trim(), 10);
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
