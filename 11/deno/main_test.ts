import { assertEquals } from '../../deps.ts';
import { getTotalDistance, part1 } from './main.ts';

const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`.split('\n');

Deno.test('Part 1', () => {
	assertEquals(part1(input), 374);
});

Deno.test('Part 2', () => {
	assertEquals(getTotalDistance(input, 100), 8410);
});
