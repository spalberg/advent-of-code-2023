import { match, P } from '../../deps.ts';

type Tile = '.' | '/' | '\\' | '|' | '-';
type Direction = 'up' | 'down' | 'left' | 'right';
type Beam = readonly [x: number, y: number, Direction];

function parseLayout(input: Array<string>): Array<Array<Tile>> {
	return input.map((l) => l.split('') as Array<Tile>);
}

function countEnergizedTiles(layout: Array<Array<Tile>>, initialBeam: Beam): number {
	const maxY = layout.length - 1;
	const maxX = layout[0].length - 1;
	const beams: Array<Beam> = [initialBeam];
	let beam: Beam | undefined;
	const energizedTiles = new Map<string, Set<Direction>>();
	// deno-lint-ignore no-cond-assign
	while (beam = beams.shift()) {
		const [x, y, direction] = beam;
		if (x < 0 || y < 0 || x > maxX || y > maxY) {
			continue;
		}
		if (energizedTiles.has(id([x, y]))) {
			const directions = energizedTiles.get(id([x, y]))!;
			if (directions.has(direction)) {
				continue;
			}
			directions.add(direction);
		} else {
			energizedTiles.set(id([x, y]), new Set([direction]));
		}
		const tile = layout[y][x];
		beams.push(...calculateBeams(x, y, direction, tile));
	}
	return new Set([...energizedTiles.keys()]).size;
}

function calculateBeams(x: number, y: number, direction: Direction, tile: Tile): Array<Beam> {
	return match(tile)
		.with('.', () => [calculateBeamsForDirection(direction)])
		.with('/', () =>
			match(direction)
				.with('up', () => [calculateBeamsForDirection('right')])
				.with('down', () => [calculateBeamsForDirection('left')])
				.with('left', () => [calculateBeamsForDirection('down')])
				.with('right', () => [calculateBeamsForDirection('up')])
				.exhaustive())
		.with('\\', () =>
			match(direction)
				.with('up', () => [calculateBeamsForDirection('left')])
				.with('down', () => [calculateBeamsForDirection('right')])
				.with('left', () => [calculateBeamsForDirection('up')])
				.with('right', () => [calculateBeamsForDirection('down')])
				.exhaustive())
		.with('-', () =>
			match(direction)
				.with(P.union('left', 'right'), () => [calculateBeamsForDirection(direction)])
				.with(
					P.union('up', 'down'),
					() => [calculateBeamsForDirection('left'), calculateBeamsForDirection('right')],
				)
				.exhaustive())
		.with('|', () =>
			match(direction)
				.with(P.union('up', 'down'), () => [calculateBeamsForDirection(direction)])
				.with(
					P.union('left', 'right'),
					() => [calculateBeamsForDirection('up'), calculateBeamsForDirection('down')],
				)
				.exhaustive())
		.exhaustive();

	function calculateBeamsForDirection(d: Direction): Beam {
		return match(d)
			.with('up', () => [x, y - 1, d] as const)
			.with('down', () => [x, y + 1, d] as const)
			.with('left', () => [x - 1, y, d] as const)
			.with('right', () => [x + 1, y, d] as const)
			.exhaustive();
	}
}

const id = ([x, y]: [x: number, y: number]) => `${x}-${y}`;

export function part1(input: Array<string>): number {
	const layout = parseLayout(input);
	return countEnergizedTiles(layout, [0, 0, 'right']);
}

export function part2(input: Array<string>): number {
	const layout = parseLayout(input);
	const maxY = layout.length - 1;
	const maxX = layout[0].length - 1;
	const initialBeams: Array<Beam> = [];
	for (let x = 0; x <= maxX; x++) {
		initialBeams.push([x, 0, 'down']);
		initialBeams.push([x, maxY, 'up']);
	}
	for (let y = 0; y <= maxY; y++) {
		initialBeams.push([0, y, 'right']);
		initialBeams.push([maxX, y, 'left']);
	}
	return initialBeams.reduce(
		(max, initialBeam) => Math.max(max, countEnergizedTiles(layout, initialBeam)),
		-1,
	);
}
