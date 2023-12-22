import { match } from './deps.ts';

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

export type Direction = 'up' | 'down' | 'left' | 'right';
export type Coordinate = readonly [x: number, y: number];

export class Grid<Tile> {
	private constructor(private readonly grid: Array<Array<Tile>>) {}

	public get maxY(): number {
		return this.grid.length - 1;
	}

	public get maxX(): number {
		return this.grid[0].length - 1;
	}

	public at(x: number, y: number): Tile | null {
		if (!this.isInBounds(x, y)) return null;
		return this.grid[y][x];
	}

	public isInBounds(x: number, y: number): boolean {
		return x >= 0 && y >= 0 && x <= this.maxX && y <= this.maxY;
	}

	public getCoordinateInDirection(
		x: number,
		y: number,
		direction: Direction,
	): Coordinate | null {
		const point = match(direction)
			.with('up', () => [x, y - 1] as const)
			.with('down', () => [x, y + 1] as const)
			.with('left', () => [x - 1, y] as const)
			.with('right', () => [x + 1, y] as const)
			.exhaustive();
		if (!this.isInBounds(...point)) return null;
		return point;
	}

	public getNeighbors(x: number, y: number, includeDiagonal = false): Array<Tile> {
		const neighbors = [
			this.at(x, y - 1),
			this.at(x, y + 1),
			this.at(x - 1, y),
			this.at(x + 1, y),
		];
		if (includeDiagonal) {
			neighbors.push(
				this.at(x - 1, y - 1),
				this.at(x + 1, y - 1),
				this.at(x - 1, y + 1),
				this.at(x + 1, y + 1),
			);
		}
		return neighbors.filter(notNull);
	}

	public clone(): Grid<Tile> {
		return new Grid(this.grid.map((row) => [...row]));
	}

	public toArray(): Array<Array<Tile>> {
		return this.grid.map((row) => [...row]);
	}

	public static fromLines<Tile = string>(
		lines: Array<string>,
		{
			mapper = (tile) => tile as unknown as Tile,
			splitter = (line) => line.split(''),
		}: {
			mapper?: (tile: string) => Tile;
			splitter?: (line: string) => Array<string>;
		},
	): Grid<Tile> {
		return new Grid(
			lines.map((line) => splitter(line).map((tile) => mapper(tile))),
		);
	}

	public static get directions(): Array<Direction> {
		return ['up', 'down', 'left', 'right'];
	}
}
