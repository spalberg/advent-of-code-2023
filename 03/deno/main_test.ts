import { assertEquals } from 'assert';
import { part1, part2 } from './main.ts';

const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`.split('\n');

Deno.test('Part 1', () => {
	assertEquals(part1(input), 4361);
});

Deno.test('Part 2', () => {
	assertEquals(part2(input), 467835);
});
