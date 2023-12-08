import { invariant } from '../../deps.ts';
import { lcm } from '../../utils.ts';

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
	const steps = nodes.map(() => 0);
	for (let i = 0; i < nodes.length; i++) {
		while (!nodes[i].endsWith('Z')) {
			nodes[i] = instructions[steps[i] % instructions.length] === 'L'
				? left.get(nodes[i])!
				: right.get(nodes[i])!;
			steps[i] += 1;
		}
	}
	return steps.reduce(lcm);
}
