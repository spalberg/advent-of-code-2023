import { toInt } from '../../utils.ts';

function parseSequence(line: string): Array<number> {
	return line.split(' ').map(toInt);
}

function derive(sequence: Array<number>): Array<Array<number>> {
	const sequences = [[...sequence]];
	while (!sequences[sequences.length - 1].every((n) => n === 0)) {
		const last = sequences[sequences.length - 1];
		const next = [];
		for (let i = 0; i < last.length - 1; i++) {
			next.push(last[i + 1] - last[i]);
		}
		sequences.push(next);
	}
	return sequences;
}

function extrapolate(sequence: Array<number>): Array<number> {
	const sequences = derive(sequence);
	sequences[sequences.length - 1].push(0);
	for (let i = sequences.length - 1; i > 0; i--) {
		const last = sequences[i];
		const previous = sequences[i - 1];
		previous.push(last[last.length - 1] + previous[previous.length - 1]);
	}
	return sequences[0];
}

function extrapolateBackward(sequence: Array<number>): Array<number> {
	const sequences = derive(sequence);
	sequences[sequences.length - 1].unshift(0);
	for (let i = sequences.length - 1; i > 0; i--) {
		const last = sequences[i];
		const previous = sequences[i - 1];
		previous.unshift(previous[0] - last[0]);
	}
	return sequences[0];
}

export function part1(input: Array<string>): number {
	return input.map(parseSequence)
		.map(extrapolate)
		.map((s) => s[s.length - 1])
		.reduce((a, b) => a + b);
}

export function part2(input: Array<string>): number {
	return input.map(parseSequence)
		.map(extrapolateBackward)
		.map((s) => s[0])
		.reduce((a, b) => a + b);
}
