type Cubes = Record<'red' | 'green' | 'blue', number>;
type Game = { id: number; subsets: Array<Cubes> };

function parseGame(line: string): Game {
	const [id, subsets] = line.split(': ');
	return {
		id: parseInt(id.slice(5)),
		subsets: subsets.split('; ').map((subset) => {
			const cubes: Cubes = { red: 0, green: 0, blue: 0 };
			for (const cube of subset.split(', ')) {
				const [count, color] = cube.split(' ');
				cubes[color as keyof Cubes] += parseInt(count);
			}
			return cubes;
		}),
	};
}

export function part1(input: Array<string>): number {
	const totalCubes: Cubes = { red: 12, green: 13, blue: 14 };
	return input
		.map(parseGame)
		.filter((game) =>
			game.subsets.every((subset) =>
				Object.entries(subset).every(([color, count]) => count <= totalCubes[color as keyof Cubes])
			)
		)
		.reduce((acc, { id }) => acc + id, 0);
}

function neededCubes({ subsets }: Game): Cubes {
	const minCubes: Cubes = { red: 0, green: 0, blue: 0 };
	for (const subset of subsets) {
		for (const [color, count] of Object.entries(subset)) {
			minCubes[color as keyof Cubes] = Math.max(minCubes[color as keyof Cubes], count);
		}
	}
	return minCubes;
}

function getScore(cubes: Cubes): number {
	return Object.values(cubes).reduce((acc, count) => acc * count, 1);
}

export function part2(input: Array<string>): number {
	return input
		.map(parseGame)
		.map(neededCubes)
		.map(getScore)
		.reduce((acc, score) => acc + score, 0);
}
