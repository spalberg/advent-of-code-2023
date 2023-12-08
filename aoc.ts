import { parseArgs } from './deps.ts';

if (import.meta.main) {
	const args = parseArgs(Deno.args);
	if (args._.length < 1) {
		console.error('Usage: deno task run <day>');
		Deno.exit(1);
	}
	const day = args._[0].toString().padStart(2, '0');
	const { part1, part2 } = await import(`./${day}/deno/main.ts`);
	const input = await Deno.readTextFile(`./${day}/input.txt`).then((input) => input.split('\n'));
	console.log(`Part 1: ${part1(input)}`);
	console.log(`Part 2: ${part2(input)}`);
}
