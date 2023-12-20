import { assertEquals } from '../../deps.ts';
import { part1, part2 } from './main.ts';

const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`.split('\n');

Deno.test('Part 1', () => {
	assertEquals(part1(input), 1320);
});

Deno.test('Part 2', () => {
	assertEquals(part2(input), 145);
});
