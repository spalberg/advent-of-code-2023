import { assertEquals } from 'assert';
import { part1, part2 } from './main.ts';

Deno.test('Part 1', () => {
	const input = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];
	assertEquals(part1(input), 142);
});

Deno.test('Part 2', () => {
	const input = [
		'two1nine',
		'eightwothree',
		'abcone2threexyz',
		'xtwone3four',
		'4nineeightseven2',
		'zoneight234',
		'7pqrstsixteen',
	];
	assertEquals(part2(input), 281);
});
