import { match } from '../../deps.ts';

type Direction = 'N' | 'E' | 'S' | 'W';
type Plane = Array<Array<'O' | '.' | '#'>>;

function parsePlane(input: Array<string>): Plane {
	return input.map((line) => line.split('') as Array<'O' | '.' | '#'>);
}

function tiltNorth(plane: Plane): Plane {
	const nextFreeSpots = Array(plane[0].length).fill(0);
	for (let y = 0; y < plane.length; y++) {
		for (let x = 0; x < plane[y].length; x++) {
			match(plane[y][x])
				.with('O', () => {
					const nextFreeSpot = nextFreeSpots[x];
					if (nextFreeSpot === y) {
						nextFreeSpots[x] = nextFreeSpot + 1;
						return;
					}
					if (plane[nextFreeSpot][x] === 'O') {
						console.warn(`Collision at ${x},${nextFreeSpot}`);
					}
					plane[nextFreeSpot][x] = 'O';
					plane[y][x] = '.';
					nextFreeSpots[x] = nextFreeSpot + 1;
				})
				.with('.', () => {})
				.with('#', () => {
					nextFreeSpots[x] = y + 1;
				})
				.exhaustive();
		}
	}
	return plane;
}

function calculateLoadNorth(plane: Plane): number {
	let load = 0;
	for (let y = 0; y < plane.length; y++) {
		for (let x = 0; x < plane[y].length; x++) {
			if (plane[y][x] === 'O') {
				load += plane.length - y;
			}
		}
	}
	return load;
}

function rotateClockwise(plane: Plane): Plane {
	const newPlane: Plane = [];
	for (let x = 0; x < plane[0].length; x++) {
		newPlane.push([]);
		for (let y = plane.length - 1; y >= 0; y--) {
			newPlane[x].push(plane[y][x]);
		}
	}
	return newPlane;
}

const cycle = (plane: Plane): Plane => {
	plane = tiltNorth(plane);
	plane = rotateClockwise(plane);
	plane = tiltNorth(plane);
	plane = rotateClockwise(plane);
	plane = tiltNorth(plane);
	plane = rotateClockwise(plane);
	plane = tiltNorth(plane);
	plane = rotateClockwise(plane);
	return plane;
};

export function part1(input: Array<string>): number {
	const plane = parsePlane(input);
	tiltNorth(plane);
	return calculateLoadNorth(plane);
}

function findCycleCycle(plane: Plane) {
	const cycleFinder = new Map<string, number>();
	for (let i = 0; i < 1000000000; i++) {
		plane = cycle(plane);
		const id = plane.map((l) => l.join('')).join('\n');
		if (cycleFinder.has(id)) {
			return [cycleFinder, cycleFinder.get(id)!] as const;
		}
		cycleFinder.set(id, i);
	}
	throw new Error('No cycle cycle found');
}

export function part2(input: Array<string>): number {
	const plane = parsePlane(input);
	const [cycleCycle, cycleStart] = findCycleCycle(plane);
	const cycleLength = cycleCycle.size - cycleStart;
	const cycleIndex = ((1000000000 - cycleStart) % cycleLength) + cycleStart - 1;
	const cyclePlane = parsePlane(Array.from(cycleCycle.keys())[cycleIndex].split('\n'));
	return calculateLoadNorth(cyclePlane);
}
