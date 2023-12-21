import * as day1 from './01/deno/main.ts';
import * as day2 from './02/deno/main.ts';
import * as day3 from './03/deno/main.ts';
import * as day4 from './04/deno/main.ts';
import * as day5 from './05/deno/main.ts';
import * as day6 from './06/deno/main.ts';
import * as day7 from './07/deno/main.ts';
import * as day8 from './08/deno/main.ts';
import * as day9 from './09/deno/main.ts';
import * as day10 from './10/deno/main.ts';
import * as day11 from './11/deno/main.ts';
import * as day12 from './12/deno/main.ts';
import * as day13 from './13/deno/main.ts';
import * as day14 from './14/deno/main.ts';
import * as day15 from './15/deno/main.ts';
import * as day16 from './16/deno/main.ts';

export const days = new Map(
	[
		[1, day1],
		[2, day2],
		[3, day3],
		[4, day4],
		[5, day5],
		[6, day6],
		[7, day7],
		[8, day8],
		[9, day9],
		[10, day10],
		[11, day11],
		[12, day12],
		[13, day13],
		[14, day14],
		[15, day15],
		[16, day16],
	] as const,
);
