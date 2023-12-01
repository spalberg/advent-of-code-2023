export function getInput(day: number): Array<string> {
	return Deno.readTextFileSync(`./${day.toString().padStart(2, '0')}/input.txt`).split('\n');
}
