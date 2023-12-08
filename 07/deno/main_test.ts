import { assertEquals } from 'assert';
import { part1, part2, rankHands } from './main.ts';

const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`.split('\n');

Deno.test('Part 1', () => {
	assertEquals(part1(input), 6440);
});

Deno.test('Part 2', () => {
	assertEquals(part2(input), 5905);
});
