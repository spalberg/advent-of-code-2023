import { getInput } from 'utils';

export function part1(input: Array<string>): number {
	let sum = 0;
	for (let currentLine = 0; currentLine < input.length; currentLine++) {
		const line = input[currentLine];
		for (const numberMatch of line.matchAll(/\d+/g)) {
			const number = numberMatch[0];
			const numberIndex = numberMatch.index!;
			if (isAdjecentToSymbol(currentLine, numberIndex, number.length)) {
				sum += parseInt(number);
			}
		}
	}
	return sum;

	function isAdjecentToSymbol(
		lineIndex: number,
		numberIndex: number,
		numberLength: number,
	): boolean {
		for (let y = Math.max(0, lineIndex - 1); y <= Math.min(input.length - 1, lineIndex + 1); y++) {
			const line = input[y];
			for (
				let x = Math.max(0, numberIndex - 1);
				x <= Math.min(line.length - 1, numberIndex + numberLength);
				x++
			) {
				const char = line[x];
				if ((char < '0' || char > '9') && char !== '.') {
					return true;
				}
			}
		}
		return false;
	}
}

export function part2(input: Array<string>): number {
	const astrixMap = new Map<string, number[]>();
	const key = (x: number, y: number) => `${x},${y}`;
	const push = (x: number, y: number, value: number) => {
		const list = astrixMap.get(key(x, y)) ?? [];
		list.push(value);
		astrixMap.set(key(x, y), list);
	};
	for (let currentLine = 0; currentLine < input.length; currentLine++) {
		const line = input[currentLine];
		for (const numberMatch of line.matchAll(/\d+/g)) {
			const number = numberMatch[0];
			const numberIndex = numberMatch.index!;
			for (
				let y = Math.max(0, currentLine - 1);
				y <= Math.min(input.length - 1, currentLine + 1);
				y++
			) {
				const line = input[y];
				for (
					let x = Math.max(0, numberIndex - 1);
					x <= Math.min(line.length - 1, numberIndex + number.length);
					x++
				) {
					if (line[x] === '*') {
						push(x, y, parseInt(number));
					}
				}
			}
		}
	}
	return [...astrixMap.values()].filter((v) => v.length === 2).reduce(
		(acc, [a, b]) => acc + (a * b),
		0,
	);
}

if (import.meta.main) {
	const input = getInput(3);
	console.log(`Part 1: ${part1(input)}`);
	console.log(`Part 2: ${part2(input)}`);
}
