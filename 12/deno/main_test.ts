import { assertEquals } from '../../deps.ts';
import { part1, part2 } from './main.ts';

const input = [
	'???.### 1,1,3',
	'.??..??...?##. 1,1,3',
	'?#?#?#?#?#?#?#? 1,3,1,6',
	'????.#...#... 4,1,1',
	'????.######..#####. 1,6,5',
	'?###???????? 3,2,1',
];

Deno.test('Part 1', () => {
	assertEquals(part1(input), 21);
});

// Deno.test('Part 2', () => {
// 	assertEquals(part2(input), 42);
// });
