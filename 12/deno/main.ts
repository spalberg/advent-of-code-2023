import { memo, parseInt } from '../../utils.ts';

function parseRecords(
	input: Array<string>,
): Array<[row: string, groups: readonly number[]]> {
	return input.map((line) => {
		const [row, groups] = line.split(' ');
		return [
			row,
			groups.split(',').map(parseInt),
		];
	});
}

const countPossibleArragements = memo((row: string, groups: readonly number[]): number => {
	if (groups.length === 0) {
		if (row.includes('#')) return 0;
		return 1;
	}
	if (row.length === 0) {
		return 0;
	}
	if (row.length < groups.reduce((a, b) => a + b) + groups.length - 1) return 0;
	if (row[0] === '.') {
		return countPossibleArragements(row.slice(1), groups);
	}
	if (row[0] === '#') {
		const group = groups[0];
		for (let i = 0; i < group; i++) {
			if (row[i] === '.') return 0;
		}
		if (row[group] === '#') return 0;
		return countPossibleArragements(row.slice(group + 1), groups.slice(1));
	}
	return countPossibleArragements('#' + row.slice(1), groups) +
		countPossibleArragements('.' + row.slice(1), groups);
});

export function part1(input: Array<string>): number {
	return parseRecords(input)
		.reduce((sum, [row, groups]) => sum + countPossibleArragements(row, groups), 0);
}

export function part2(input: Array<string>): number {
	return parseRecords(input)
		.map(([row, groups]) =>
			[
				Array.from(Array(5).keys()).map((_) => row).join('?'),
				Array.from(Array(5).keys()).flatMap((_) => groups),
			] as const
		)
		.reduce((sum, [row, groups]) => sum + countPossibleArragements(row, groups), 0);
}
