import { assertEquals } from '../../deps.ts';
import { part1, part2 } from './main.ts';

const input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`.split('\n');

Deno.test('Part 1', () => {
	assertEquals(part1(input), 405);
});

// Deno.test('Part 2', () => {
// 	assertEquals(part2(input), 42);
// });
