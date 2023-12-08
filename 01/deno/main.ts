function extractValue(line: string): number {
	const match = line.match(/^\D*(\d).*?(\d)?\D*$/);
	if (match == null) throw new Error('Invalid input');
	const [, a, b] = match;
	return parseInt(a + (b != null ? b : a));
}

export function part1(lines: Array<string>): number {
	return lines
		.map(extractValue)
		.reduce((a, b) => a + b);
}

const digitMap: Record<string, string> = {
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
};

function reverse(s: string): string {
	return [...s].reverse().join('');
}

function extractValueWithSpelledOutDigits(line: string): number {
	const firstMatch = new RegExp(`(\\d|${Object.keys(digitMap).join('|')})`).exec(line);
	const secondMatch = new RegExp(`(\\d|${Object.keys(digitMap).map(reverse).join('|')})`).exec(
		reverse(line),
	);
	if (firstMatch == null || secondMatch == null) throw new Error('Invalid input');
	const a = digitMap[firstMatch[1]] ?? firstMatch[1];
	const b = digitMap[reverse(secondMatch[1])] ?? secondMatch[1];
	return parseInt(a + b);
}

export function part2(lines: Array<string>): number {
	return lines
		.map(extractValueWithSpelledOutDigits)
		.reduce((a, b) => a + b);
}
