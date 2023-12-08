# Advent of Code 2023

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/spalberg/advent-of-code-2023)

24 reasons why deno is awesome - hopefully.

## Run my code

Make sure you have [deno](https://deno.com/) installed on your system.

Then simply execute:

```bash
# interactive
deno run -A --reload=https://raw.githubusercontent.com  https://raw.githubusercontent.com/spalberg/advent-of-code-2023/main/aoc.ts
# discover the options 
deno run -A --reload=https://raw.githubusercontent.com  https://raw.githubusercontent.com/spalberg/advent-of-code-2023/main/aoc.ts --help
```

Or merge this into your own `deno.json` to simply execute
`deno task remote -d <DAY> -i path/to/your/input.txt`:

```json
{
	"tasks": {
		"remote": "deno run -A --reload=https://raw.githubusercontent.com  https://raw.githubusercontent.com/spalberg/advent-of-code-2023/main/aoc.ts"
	}
}
```
