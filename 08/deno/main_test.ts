import { assertEquals } from '../../deps.ts';
import { part1, part2 } from './main.ts';

Deno.test('Part 1', () => {
	const input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`.split('\n');
	assertEquals(part1(input), 6);
});

Deno.test('Part 2', () => {
	const input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`.split('\n');
	assertEquals(part2(input), 6);
});
