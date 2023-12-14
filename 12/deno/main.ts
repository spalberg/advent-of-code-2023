import { parseInt, tap, tapF } from '../../utils.ts';

type Marker = '#' | '.' | '?';

type Row = {
	damagedArrangement: Array<Marker>;
	groups: Array<number>;
};

export function parseRecords(input: Array<string>): Array<Row> {
	return input.map((line) => {
		const [damagedArrangement, groups] = line.split(' ');
		return {
			damagedArrangement: damagedArrangement.split('') as Array<Marker>,
			groups: groups.split(',').map(parseInt),
		};
	});
}

export function findPossibleArragement({ damagedArrangement, groups }: Row): Array<Array<Marker>> {
	const length = damagedArrangement.length;
	const strictRegex = new RegExp('^\\.*' + groups.map((g) => `(#{${g}})`).join('\\.+') + '\\.*$');
	const laxRegex = new RegExp(
		'^[\\.?]*' + groups.map((g) => `([#?]{${g}})`).join('[\\.?]+') + '[\\.?]*$',
	);
	return findPossibleArragementRec(damagedArrangement);

	function findPossibleArragementRec(arrangement: Array<Marker>, index = 0): Array<Array<Marker>> {
		if (index === length) {
			return match(arrangement, strictRegex) ? [arrangement] : [];
		}
		const marker = arrangement[index];
		if (!match(arrangement, laxRegex)) return [];
		if (marker === '?') {
			return [
				...findPossibleArragementRec(replaceAt(arrangement, index, '.'), index + 1),
				...findPossibleArragementRec(replaceAt(arrangement, index, '#'), index + 1),
			];
		} else {
			return findPossibleArragementRec(arrangement, index + 1);
		}
	}

	function match(arrangement: Array<Marker>, regex: RegExp): boolean {
		return arrangement.join('').match(regex) != null;
	}

	function replaceAt(arrangement: Array<Marker>, index: number, marker: Marker): Array<Marker> {
		const copy = [...arrangement];
		copy[index] = marker;
		return copy;
	}
}

export function part1(input: Array<string>): number {
	return parseRecords(input)
		.reduce((sum, row) => sum + findPossibleArragement(row).length, 0);
}

export function part2(input: Array<string>): number {
	return -1;
}
