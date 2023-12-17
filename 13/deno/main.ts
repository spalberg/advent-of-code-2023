function parsePatterns(input: Array<string>) {
	return input.join('\n').split('\n\n').map((s) => s.split('\n'));
}

function findVerticalReflection(pattern: Array<string>): number | null {
	const length = pattern[0].length;
	for (let i = 1; i < length; i++) {
		let found = true;
		for (const line of pattern) {
			const compareLength = Math.min(i, length - i);
			const left = line.slice(Math.max(0, i - compareLength), i);
			const right = line.slice(i, Math.min(i + compareLength, length)).split('')
				.toReversed().join('');
			if (left !== right) {
				found = false;
				break;
			}
		}
		if (found) {
			return i;
		}
	}
	return null;
}

function rotate(pattern: Array<string>): Array<string> {
	const p = pattern.map((line) => line.split('').reverse());
	return Array.from(Array(p.length).keys()).map((i) => p.map((line) => line[i]).join(''));
}

export function part1(input: Array<string>): number {
	return parsePatterns(input)
		.map((pattern) => {
			const v = findVerticalReflection(pattern);
			const h = findVerticalReflection(rotate(pattern));
			if (v == null && h == null) throw new Error('no reflection found match');
			return (v != null ? v : 0) + (h != null ? h * 100 : 0);
		})
		.reduce((a, b) => a + b);
}

export function part2(input: Array<string>): number {
	return -1;
}
