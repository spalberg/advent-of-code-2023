import { parseInt } from '../../utils.ts';

type Range = [start: number, length: number];
type MappingGroup = Array<[Range, number]>;

function parseInput(
	input: Array<string>,
): { seeds: Array<number>; mappingGroups: Array<MappingGroup> } {
	const seeds = input.shift()!.replace('seeds: ', '').split(' ').map(parseInt);
	input.shift();
	const mappingGroups = [];
	let mappings: MappingGroup = [];
	input.shift();
	for (const line of input) {
		if (line === '') continue;
		if (line.includes('map:')) {
			mappingGroups.push(mappings);
			mappings = [];
			continue;
		}
		const [dest, src, length] = line.split(' ').map(parseInt);
		mappings.push([[src, length], dest]);
	}
	mappingGroups.push(mappings);
	return { seeds, mappingGroups };
}

export function part1(input: Array<string>): number {
	const { seeds, mappingGroups } = parseInput(input);
	let min = Infinity;
	for (const seed of seeds) {
		let value = seed;
		for (const mappings of mappingGroups) {
			for (const [[start, length], dest] of mappings) {
				if (value >= start && value < start + length) {
					value = dest + (value - start);
					break;
				}
			}
		}
		min = Math.min(min, value);
	}
	return min;
}

export function part2(input: Array<string>): number {
	return -1;
}
