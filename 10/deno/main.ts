import { colors, match, P, Table } from '../../deps.ts';
import { isDebug, notNull } from '../../utils.ts';

type Tile = '|' | '-' | 'L' | 'J' | '7' | 'F' | '.' | 'S';
type Area = Array<Array<Tile>>;
type Direction = 'N' | 'E' | 'S' | 'W';
type Coordinate = readonly [number, number];

function parseArea(input: Array<string>) {
	return input.map((l) => l.split('')) as Area;
}

function findMainLoop(area: Area): Array<Coordinate> {
	const start = findStart();
	const loops = (['N', 'E', 'S', 'W'] as const)
		.map((d) => findLoop(start, d))
		.filter(notNull);
	return loops.find((l) => l.length === Math.max(...loops.map((l) => l.length)))!;

	function findLoop(start: Coordinate, startDirection: Direction): Array<Coordinate> | null {
		const loop = [start];
		let direction = startDirection;
		while (true) {
			const lastCoordinate = loop[loop.length - 1];
			const nextCoordinate = getNextCoordinateInDirection(lastCoordinate, direction);
			if (nextCoordinate === null) return null;
			const nextDirection = getNextDirection(nextCoordinate, direction);
			if (nextDirection === null) return null;
			loop.push(nextCoordinate);
			direction = nextDirection;
			if (nextCoordinate[0] === start[0] && nextCoordinate[1] === start[1]) break;
		}
		return loop;
	}

	function findStart(): Coordinate {
		for (let y = 0; y < area.length; y++) {
			for (let x = 0; x < area[y].length; x++) {
				if (area[y][x] === 'S') {
					return [x, y];
				}
			}
		}
		throw new Error('Start not found');
	}

	function getNextCoordinateInDirection([x, y]: Coordinate, d: Direction): Coordinate | null {
		const next = match(d)
			.with('N', () => [x, y - 1] as const)
			.with('E', () => [x + 1, y] as const)
			.with('S', () => [x, y + 1] as const)
			.with('W', () => [x - 1, y] as const)
			.exhaustive();
		if (next[0] < 0 || next[1] < 0 || next[0] >= area[0].length || next[1] >= area.length) {
			return null;
		}
		return next;
	}

	function getNextDirection([x, y]: Coordinate, incomingDirection: Direction): Direction | null {
		return match([area[y][x], incomingDirection])
			.with(['S', P.any.select('dir')], ({ dir }) => dir)
			.with(['|', P.union('N', 'S').select('dir')], ({ dir }) => dir)
			.with(['-', P.union('W', 'E').select('dir')], ({ dir }) => dir)
			.with(['L', P.union('S', 'W').select('dir')], ({ dir }) => dir === 'S' ? 'E' : 'N')
			.with(['J', P.union('S', 'E').select('dir')], ({ dir }) => dir === 'S' ? 'W' : 'N')
			.with(['7', P.union('N', 'E').select('dir')], ({ dir }) => dir === 'N' ? 'W' : 'S')
			.with(['F', P.union('N', 'W').select('dir')], ({ dir }) => dir === 'N' ? 'E' : 'S')
			.otherwise(() => null);
	}
}

export function part1(input: Array<string>): number {
	const area = parseArea(input);
	const loop = findMainLoop(area);
	return Math.floor(loop.length / 2);
}

export function part2(input: Array<string>): number {
	const area = parseArea(input);
	const loop = findMainLoop(area);
	return (Math.abs(shoeLace(loop)) - loop.length + 3) / 2;

	function shoeLace(loop: Array<Coordinate>) {
		let area = 0;
		for (let i = 0; i < loop.length - 1; i++) {
			const [x1, y1] = loop[i];
			const [x2, y2] = loop[i + 1];
			area += x1 * y2 - x2 * y1;
		}
		return area;
	}
}
