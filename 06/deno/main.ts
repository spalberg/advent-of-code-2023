import { getInput, parseInt } from 'utils';

function parseRaces(input: Array<string>) {
	const times = input[0].match(/\b(\d+)\b/g)?.map(parseInt) ?? [];
	const distances = input[1].match(/\b(\d+)\b/g)?.map(parseInt) ?? [];
	return times.map((time, index) => ({ time, distance: distances[index] }));
}

function getStrategies(totalTime: number) {
	return Array.from({ length: totalTime + 1 }, (_, i) => i).map((mmpms) => ({
		mmpms,
		time: totalTime - mmpms,
		distance: mmpms * (totalTime - mmpms),
	}));
}

export function part1(input: Array<string>): number {
	return parseRaces(input)
		.map(({ time, distance }) => getStrategies(time).filter((s) => s.distance > distance).length)
		.reduce((a, b) => a * b);
}

export function part2(input: Array<string>): number {
	const { time, distance } = parseRaces(input.map((l) => l.replaceAll(' ', '')))[0];
	let min = 0;
	for (min = 0; min <= time; min++) {
		if (min * (time - min) > distance) {
			break;
		}
	}
	let max = time;
	for (max = time; max >= 0; max--) {
		if (max * (time - max) > distance) {
			break;
		}
	}
	return max - min + 1;
}

if (import.meta.main) {
	const input = getInput(6);
	console.log(`Part 1: ${part1(input)}`);
	console.log(`Part 2: ${part2(input)}`);
}
