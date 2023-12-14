type Image = Array<string>;
type Galaxy = readonly [number, number];

function locateGalaxies(image: Image): Array<Galaxy> {
	const galaxies: Array<Galaxy> = [];
	for (let y = 0; y < image.length; y++) {
		for (let x = 0; x < image[y].length; x++) {
			if (image[y][x] === '#') {
				galaxies.push([x, y]);
			}
		}
	}
	return galaxies;
}

export function getTotalDistance(image: Image, expansionFactor: number): number {
	const galaxies = locateGalaxies(image);
	const columnsWithGalaxies = [...new Set(galaxies.map((g) => g[0]).sort())];
	const rowsWithGalaxies = [...new Set(galaxies.map((g) => g[1]).sort())];

	let totalDistance = 0;
	for (let i = 0; i < galaxies.length; i++) {
		for (let y = i + 1; y < galaxies.length; y++) {
			const [x1, y1] = galaxies[i];
			const [x2, y2] = galaxies[y];
			const distanceX = Math.abs(x1 - x2);
			const distanceY = Math.abs(y1 - y2);
			const distance = +distanceX + distanceY + expandedSpaceBetween(x1, x2, columnsWithGalaxies) +
				expandedSpaceBetween(y1, y2, rowsWithGalaxies);
			totalDistance += distance;
		}
	}

	return totalDistance;

	function expandedSpaceBetween(a: number, b: number, fixPoints: Array<number>) {
		const between = Math.max(0, Math.abs(a - b) - 1);
		const fixed = fixPoints.filter((p) => p > Math.min(a, b) && p < Math.max(a, b)).length;
		return (between - fixed) * (expansionFactor - 1);
	}
}

export function part1(input: Array<string>): number {
	return getTotalDistance(input, 2);
}

export function part2(input: Array<string>): number {
	return getTotalDistance(input, 1_000_000);
}
