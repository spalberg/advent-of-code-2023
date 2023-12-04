import { getInput, parseInt } from 'utils';

function parseCard(line: string) {
	const [_, id, winningNumbers, ownNumbers] = line.match(/Card +(\d+): (.*) \| (.*)/) ?? [];
	return {
		id: parseInt(id),
		winningNumbers: winningNumbers.split(' ').filter(Boolean).map(parseInt),
		ownNumbers: ownNumbers.split(' ').filter(Boolean).map(parseInt),
	};
}

function getMatches({ winningNumbers, ownNumbers }: ReturnType<typeof parseCard>) {
	return winningNumbers.filter((number) => ownNumbers.includes(number)).length;
}

export function part1(input: Array<string>): number {
	return input
		.map(parseCard)
		.map(getMatches)
		.map((matches) => matches > 0 ? Math.pow(2, matches - 1) : 0)
		.reduce((a, b) => a + b);
}

export function part2(input: Array<string>): number {
	const originalCards = input.map(parseCard);
	const cards = new Map(originalCards.map(({ id }) => [id, 1]));
	for (const card of originalCards) {
		const matches = getMatches(card);
		for (let i = 1; i <= matches; i++) {
			const cardId = card.id + i;
			cards.set(cardId, cards.get(cardId)! + cards.get(card.id)!);
		}
	}
	return [...cards.values()].reduce((a, b) => a + b);
}

if (import.meta.main) {
	const input = getInput(4);
	console.log(`Part 1: ${part1(input)}`);
	console.log(`Part 2: ${part2(input)}`);
}
