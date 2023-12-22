import { assertEquals } from '../../deps.ts';
import { part1, part2 } from './main.ts';

const input = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`.split('\n');

Deno.test('Part 1', () => {
	assertEquals(part1(input), 102);
});

Deno.test('Part 2', () => {
	assertEquals(part2(input), 94);
	assertEquals(
		part2(`111111111111
999999999991
999999999991
999999999991
999999999991`.split('\n')),
		71,
	);
});
