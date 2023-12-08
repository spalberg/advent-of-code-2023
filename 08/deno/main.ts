import { invariant } from '../../deps.ts';

function parseMappings(mappings: Array<string>) {
	const left = new Map<string, string>();
	const right = new Map<string, string>();
	for (const mapping of mappings) {
		const match = mapping.match(/^(\w{3}) = \((\w{3}), (\w{3})\)$/);
		invariant(match !== null, `Invalid mapping: ${mapping}`);
		const [, source, destinationLeft, destinationRight] = match;
		left.set(source, destinationLeft);
		right.set(source, destinationRight);
	}
	return { left, right };
}

export function part1(input: Array<string>): number {
	const [instructions, _, ...mappings] = input;
	const { left, right } = parseMappings(mappings);
	let node = 'AAA';
	let steps = 0;
	while (node !== 'ZZZ') {
		node = instructions[steps % instructions.length] === 'L' ? left.get(node)! : right.get(node)!;
		steps += 1;
	}
	return steps;
}

export function part2(input: Array<string>): number {
	const [instructions, _, ...mappings] = input;
	const { left, right } = parseMappings(mappings);
	const nodes = [...left.keys()].filter((node) => node.endsWith('A'));
	let steps = 0;
	while (!nodes.every((node) => node.endsWith('Z'))) {
		for (let i = 0; i < nodes.length; i++) {
			nodes[i] = instructions[steps % instructions.length] === 'L'
				? left.get(nodes[i])!
				: right.get(nodes[i])!;
		}
		steps += 1;
		if (steps % 10_000 === 0) console.log(steps);
	}
	return steps;
}
