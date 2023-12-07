import { assertEquals } from 'assert';
import { part1, part2 } from './main.ts';

const input = `Time:      7  15   30
Distance:  9  40  200`.split('\n');

Deno.test('Part 1', () => {
	assertEquals(part1(input), 288);
});

Deno.test('Part 2', () => {
	assertEquals(part2(input), 71503);
});
