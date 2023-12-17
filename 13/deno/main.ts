function parsePatterns(input: Array<string>) {
	return input.join('\n').split('\n\n').map((s) => s.split('\n'));
}

function findVerticalReflection(pattern: Array<string>, smudgeTarget = 0): number | null {
	const length = pattern[0].length;
	for (let i = 1; i < length; i++) {
		let smudges = 0;
		for (const line of pattern) {
			const compareLength = Math.min(i, length - i);
			const left = line.slice(Math.max(0, i - compareLength), i).split('');
			const right = line.slice(i, Math.min(i + compareLength, length)).split('')
				.toReversed();
			for (let j = 0; j < compareLength; j++) {
				if (left[j] !== right[j]) {
					smudges++;
					if (smudges > smudgeTarget) {
						break;
					}
				}
			}
		}
		if (smudges === smudgeTarget) {
			return i;
		}
	}
	return null;
}

function rotate(pattern: Array<string>): Array<string> {
	const rows = Array(pattern[0].length).fill('');
	for (const line of pattern) {
		for (let i = line.length - 1; i >= 0; i--) {
			rows[line.length - i - 1] += line[i];
		}
	}
	return rows;
}

export function part1(input: Array<string>): number {
	return parsePatterns(input)
		.map((pattern) => {
			const v = findVerticalReflection(pattern);
			if (v != null) return v;
			const h = findVerticalReflection(rotate(pattern));
			if (h != null) return h * 100;
			throw new Error('no reflection found match');
		})
		.reduce((a, b) => a + b);
}

export function part2(input: Array<string>): number {
	return parsePatterns(input)
		.map((pattern) => {
			const v = findVerticalReflection(pattern, 1);
			if (v != null) return v;
			const h = findVerticalReflection(rotate(pattern), 1);
			if (h != null) return h * 100;
			throw new Error('no reflection found match');
		})
		.reduce((a, b) => a + b);
}

function debug(pattern: Array<string>, reflectionBeforeIndex: number, isVertical: boolean) {
	if (isVertical) {
		console.log(
			Array.from(Array(pattern[0].length).keys()).map((i) => Math.floor((i + 1) / 10)).join(''),
		);
		console.log(Array.from(Array(pattern[0].length).keys()).map((i) => (i + 1) % 10).join(''));
		console.log(
			Array.from(Array(pattern[0].length).keys()).map((i) =>
				i === reflectionBeforeIndex - 1 ? '>' : i === reflectionBeforeIndex ? '<' : ' '
			).join(''),
		);
		console.log(pattern.join('\n'));
	} else {
		console.log(
			pattern.map((l, i) =>
				(i + 1).toString().padStart(2, '0') +
				(i === reflectionBeforeIndex - 1 ? 'v' : i === reflectionBeforeIndex ? '^' : ' ') +
				l
			).join('\n'),
		);
	}
	console.log();
	console.log('-----------');
	console.log();
}
