import { ascend, BinaryHeap } from '../../deps.ts';
import { type Coordinate, type Direction, Grid, toInt } from '../../utils.ts';

type QueueItem = [
	coordinate: Coordinate,
	lastDirection: Direction,
	straightSteps: number,
	heatLoss: number,
	prev: QueueItem | null,
];

export function part1(input: Array<string>): number {
	const grid = Grid.fromLines(input, { mapper: toInt });
	const target: Coordinate = [grid.maxX, grid.maxY];
	const queue = new BinaryHeap<QueueItem>((a, b) => ascend(a[3], b[3]));
	const visited = new Set<string>();
	queue.push([[0, 0], 'right', 0, 0, null]);
	queue.push([[0, 0], 'down', 0, 0, null]);

	while (!queue.isEmpty()) {
		const queryItem = queue.pop()!;
		const [coordinate, lastDirection, straightSteps, heatLoss] = queryItem;
		if (visited.has(str([coordinate, lastDirection, straightSteps]))) continue;
		if (str(coordinate) === str(target)) {
			return heatLoss;
		}
		visited.add(str([coordinate, lastDirection, straightSteps]));
		for (const d of Grid.directions) {
			if (isOppositeDirection(d, lastDirection)) continue;
			if (d === lastDirection && straightSteps === 3) continue;
			const nextCoordinate = grid.getCoordinateInDirection(...coordinate, d);
			if (nextCoordinate === null) continue;
			queue.push([
				nextCoordinate,
				d,
				d === lastDirection ? straightSteps + 1 : 1,
				heatLoss + grid.at(...nextCoordinate)!,
				queryItem,
			]);
		}
	}
	throw new Error('No path found');
}

export function part2(input: Array<string>): number {
	const grid = Grid.fromLines(input, { mapper: toInt });
	const target: Coordinate = [grid.maxX, grid.maxY];
	const queue = new BinaryHeap<QueueItem>((a, b) => ascend(a[3], b[3]));
	const visited = new Set<string>();
	queue.push([[0, 0], 'right', 0, 0, null]);
	queue.push([[0, 0], 'down', 0, 0, null]);

	while (!queue.isEmpty()) {
		const queryItem = queue.pop()!;
		const [coordinate, lastDirection, straightSteps, heatLoss] = queryItem;
		if (visited.has(str([coordinate, lastDirection, straightSteps]))) continue;
		if (str(coordinate) === str(target) && straightSteps >= 4) {
			return heatLoss;
		}
		visited.add(str([coordinate, lastDirection, straightSteps]));
		for (const d of Grid.directions) {
			if (isOppositeDirection(d, lastDirection)) continue;
			if (d === lastDirection) {
				if (straightSteps === 10) continue;
			} else {
				if (straightSteps < 4) continue;
			}
			const nextCoordinate = grid.getCoordinateInDirection(...coordinate, d);
			if (nextCoordinate === null) continue;
			queue.push([
				nextCoordinate,
				d,
				d === lastDirection ? straightSteps + 1 : 1,
				heatLoss + grid.at(...nextCoordinate)!,
				queryItem,
			]);
		}
	}
	throw new Error('No path found');
}

function str(v: unknown) {
	return JSON.stringify(v);
}

function isOppositeDirection(a: Direction, b: Direction): boolean {
	return (a === 'up' && b === 'down') ||
		(a === 'down' && b === 'up') ||
		(a === 'left' && b === 'right') ||
		(a === 'right' && b === 'left');
}
