import * as day1 from './01/deno/main.ts';
import * as day2 from './02/deno/main.ts';
import * as day3 from './03/deno/main.ts';
import * as day4 from './04/deno/main.ts';
// import * as day5 from './05/deno/main.ts';
import * as day6 from './06/deno/main.ts';
import * as day7 from './07/deno/main.ts';

export const days = new Map(
	[
		[1, day1],
		[2, day2],
		[3, day3],
		[4, day4],
		// [5, day5],
		[6, day6],
		[7, day7],
	] as const,
);
