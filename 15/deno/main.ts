function parseInitializationSequence(input: Array<string>): Array<string> {
	return input.map((l) => l.split(',')).flat();
}

function hash(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash += str.charCodeAt(i);
		hash *= 17;
		hash %= 256;
	}
	return hash;
}

export function part1(input: Array<string>): number {
	return parseInitializationSequence(input)
		.map(hash)
		.reduce((a, b) => a + b);
}

export function part2(input: Array<string>): number {
	const boxes = new Map<number, Map<string, number>>();
	for (const step of parseInitializationSequence(input)) {
		const [label, focalStrength] = step.replace('-', '').split('=');
		const boxIndex = hash(label);
		const lenses = boxes.get(boxIndex) ?? new Map<string, number>();
		if (focalStrength != null) {
			lenses.set(label, parseInt(focalStrength));
		} else {
			lenses.delete(label);
		}
		boxes.set(boxIndex, lenses);
	}

	let totalFocusPower = 0;
	for (const [boxIndex, lenses] of boxes.entries()) {
		let lensePosition = 1;
		for (const lense of lenses.values()) {
			const lensFocusPower = (boxIndex + 1) * lensePosition * lense;
			totalFocusPower += lensFocusPower;
			lensePosition += 1;
		}
	}
	return totalFocusPower;
}
