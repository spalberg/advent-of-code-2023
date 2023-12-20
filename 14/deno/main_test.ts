import { assertEquals } from '../../deps.ts';
import { part1, part2 } from './main.ts';

const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`.split('\n');

Deno.test('Part 1', () => {
	assertEquals(part1(input), 136);
});

Deno.test('Part 2', () => {
	assertEquals(part2(input), 64);
});
