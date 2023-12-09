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

function splitRange(originalRange: Range, splitterRange: Range): Array<Range> {
	const originalStart = originalRange[0];
	const originalEnd = originalRange[0] + originalRange[1] - 1;
	const splitterStart = splitterRange[0];
	const splitterEnd = splitterRange[0] + splitterRange[1] - 1;
	if (
		splitterStart > originalEnd || splitterEnd < originalStart ||
		(originalStart === splitterStart && originalEnd === splitterEnd)
	) {
		return [originalRange];
	}
	const intersectionStart = Math.max(originalStart, splitterStart);
	const intersectionEnd = Math.min(originalEnd, splitterEnd);
	const intersectionLength = intersectionEnd - intersectionStart + 1;
	const ranges: Array<Range> = [];
	if (intersectionStart > originalStart) {
		ranges.push([originalStart, intersectionStart - originalStart]);
	}
	ranges.push([intersectionStart, intersectionLength]);
	if (intersectionEnd < originalEnd) {
		ranges.push([intersectionEnd + 1, originalEnd - intersectionEnd]);
	}
	return ranges;
}

export function part2(input: Array<string>): number {
	const { seeds, mappingGroups } = parseInput(input);
	const seedRanges: Array<Range> = [];
	for (let i = 0; i < seeds.length; i += 2) {
		seedRanges.push([seeds[i], seeds[i + 1]]);
	}
	let min = Infinity;
	for (const seedRange of seedRanges) {
		const ranges: Array<Range> = [[...seedRange]];
		for (const mappings of mappingGroups) {
			for (const [spitRange] of mappings) {
				for (let i = 0; i < ranges.length; i += 1) {
					const splitRanges = splitRange(ranges[i], spitRange);
					ranges.splice(i, 1, ...splitRanges);
					i += splitRanges.length - 1;
				}
			}
			for (const range of ranges) {
				for (const [[start, length], dest] of mappings) {
					if (range[0] >= start && range[0] < start + length) {
						range[0] = dest + (range[0] - start);
						break;
					}
				}
			}
		}
		min = Math.min(min, ...ranges.map((r) => r[0]));
	}
	return min;
}
