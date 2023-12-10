import { assertEquals } from '../../deps.ts';
import { part1, part2 } from './main.ts';

Deno.test('Part 1', () => {
	const input = [
		'7-F7-',
		'.FJ|7',
		'SJLL7',
		'|F--J',
		'LJ.LJ',
	];
	assertEquals(part1(input), 8);
});

Deno.test('Part 2', () => {
	assertEquals(
		part2([
			'...........',
			'.S-------7.',
			'.|F-----7|.',
			'.||.....||.',
			'.||.....||.',
			'.|L-7.F-J|.',
			'.|..|.|..|.',
			'.L--J.L--J.',
			'...........',
		]),
		4,
	);

	assertEquals(
		part2([
			'.F----7F7F7F7F-7....',
			'.|F--7||||||||FJ....',
			'.||.FJ||||||||L7....',
			'FJL7L7LJLJ||LJ.L-7..',
			'L--J.L7...LJS7F-7L7.',
			'....F-J..F7FJ|L7L7L7',
			'....L7.F7||L7|.L7L7|',
			'.....|FJLJ|FJ|F7|.LJ',
			'....FJL-7.||.||||...',
			'....L---J.LJ.LJLJ...',
		]),
		8,
	);

	assertEquals(
		part2([
			'FF7FSF7F7F7F7F7F---7',
			'L|LJ||||||||||||F--J',
			'FL-7LJLJ||||||LJL-77',
			'F--JF--7||LJLJ7F7FJ-',
			'L---JF-JLJ.||-FJLJJ7',
			'|F|F-JF---7F7-L7L|7|',
			'|FFJF7L7F-JF7|JL---7',
			'7-L-JL7||F7|L7F-7F7|',
			'L.L7LFJ|||||FJL7||LJ',
			'L7JLJL-JLJLJL--JLJ.L',
		]),
		10,
	);
});
