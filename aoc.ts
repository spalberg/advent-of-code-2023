import { days } from './days.ts';
import { colors, Command, EnumType, invariant, Select, Table } from './deps.ts';

if (import.meta.main) {
	const availableDays = Array.from(days.keys());
	await new Command()
		.name('aoc')
		.description('Advent of Code 2023')
		.version('0.0.1')
		.type('day', new EnumType(availableDays))
		.option('-d, --day <day:day>', 'the day to run')
		.option('-i, --input [input:file]', 'the input file, can also be a URL')
		.action(async (options) => {
			invariant(options.input !== true, 'Missing input file');
			const day = options.day ??
				(await Select.prompt({
					message: 'Pick a day',
					options: availableDays,
				}) as typeof availableDays[number]);
			const inputPath = options.input ?? `./${day.toString().padStart(2, '0')}/input.txt`;

			console.log(
				colors.bold(`Running day ${day}...`) +
					` (${colors.italic(`https://adventofcode.com/2023/day/${day}`)})`,
			);

			const input = await getInput(inputPath);
			const { part1, part2 } = days.get(day)!;
			const p1 = bench(part1)(input);
			const p2 = bench(part2)(input);
			const table = new Table()
				.header(['Part', 'Result', 'Time (ms)'])
				.body([
					['1', p1.result, p1.time.toFixed(2)],
					['2', p2.result, p2.time.toFixed(2)],
				])
				.border(true);
			console.log();
			console.log(colors.bold.underline(`Results for day ${day}:`));
			console.log();
			console.log(table.toString());
		})
		.parse(Deno.args);
}

async function getInput(inputPath: string): Promise<Array<string>> {
	const content = await loadFileContent(inputPath);
	return content.split('\n');
}

async function loadFileContent(path: string): Promise<string> {
	if (path.startsWith('http://') || path.startsWith('https://')) {
		const response = await fetch(path);
		if (!response.ok) {
			throw Error(`Failed to fetch ${path}: ${response.statusText}`);
		}
		return await response.text();
	}
	return await Deno.readTextFile(path);
}

function bench(fn: (input: Array<string>) => number) {
	return (input: Array<string>) => {
		const start = performance.now();
		const result = fn(input);
		const end = performance.now();
		return { result, time: end - start };
	};
}
