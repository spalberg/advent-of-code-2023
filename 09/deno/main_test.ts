import { assertEquals } from '../../deps.ts';
import { part1, part2 } from './main.ts';

const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`.split('\n');

Deno.test('Part 1', () => {
	assertEquals(part1(input), 114);
});

Deno.test('Part 2', () => {
	assertEquals(part2(input), 2);
});
