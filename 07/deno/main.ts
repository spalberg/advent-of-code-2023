import { assert } from 'assert';
import { getInput, parseInt } from 'utils';

type Card = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
type Hand = [Card, Card, Card, Card, Card];
const typeOrder = ['five', 'four', 'full-house', 'three', 'two-pair', 'pair', 'high'] as const;
type Type = typeof typeOrder[number];
type Game = { hands: Array<Hand>; bid: (hand: Hand) => number };

function parseGame(input: Array<string>): Game {
	const lookup = new Map(
		input.map((line) => line.split(' ')).map((
			[hand, bid],
		) => ([hand, parseInt(bid)] as const)),
	);
	return {
		hands: [...lookup.keys()].map((h) => h.split('') as Hand),
		bid(hand) {
			return lookup.get(hand.join(''))!;
		},
	};
}

function strengthOfCard(card: Card): number {
	if (card === 'A') return 14;
	if (card === 'K') return 13;
	if (card === 'Q') return 12;
	if (card === 'J') return 11;
	if (card === 'T') return 10;
	return parseInt(card);
}

function handToCardCounts(hand: Hand): Array<number> {
	const counts = new Map<Card, number>();
	for (const card of hand) {
		counts.set(card, (counts.get(card) ?? 0) + 1);
	}
	return [...counts.values()].sort((a, b) => b - a);
}

function typeByCardCounts(counts: Array<number>): Type {
	if (counts.length === 1 && counts[0] === 5) return 'five';
	if (counts.length === 2 && counts[0] === 4 && counts[1] === 1) return 'four';
	if (counts.length === 2 && counts[0] === 3 && counts[1] === 2) return 'full-house';
	if (counts.length === 3 && counts[0] === 3 && counts[1] === 1 && counts[2] === 1) return 'three';
	if (counts.length === 3 && counts[0] === 2 && counts[1] === 2 && counts[2] === 1) {
		return 'two-pair';
	}
	if (
		counts.length === 4 && counts[0] === 2 && counts[1] === 1 && counts[2] === 1 && counts[3] === 1
	) {
		return 'pair';
	}
	if (counts.length === 5 && counts.every((c) => c === 1)) return 'high';
	throw new Error(`Invalid hand: ${counts}`);
}

export function rankHands(
	hands: Array<Hand>,
	type: (hand: Hand) => Type,
	strength: (card: Card) => number,
): Array<Hand> {
	const types = new Map<Hand, Type>(hands.map((h) => ([h, type(h)] as const)));
	return hands.toSorted((a, b) => {
		const typeA = types.get(a)!;
		const typeB = types.get(b)!;
		if (typeA !== typeB) return typeOrder.indexOf(typeA) - typeOrder.indexOf(typeB);
		for (let i = 0; i < a.length; i++) {
			const cardA = strength(a[i]);
			const cardB = strength(b[i]);
			if (cardA !== cardB) return cardB - cardA;
		}
		return 0;
	});
}

export function part1(input: Array<string>): number {
	const { hands, bid } = parseGame(input);
	return rankHands(hands, type, strengthOfCard)
		.map((hand, i) => bid(hand) * (hands.length - i))
		.reduce((a, b) => a + b);

	function type(hand: Hand): Type {
		const counts = handToCardCounts(hand);
		return typeByCardCounts(counts);
	}
}

export function part2(input: Array<string>): number {
	const { hands, bid } = parseGame(input);
	return rankHands(hands, type, strength)
		.map((hand, i) => bid(hand) * (hands.length - i))
		.reduce((a, b) => a + b);

	function type(hand: Hand): Type {
		const counts = handToCardCounts(hand);
		const jokerCount = hand.filter((c) => c === 'J').length;
		if (jokerCount > 0 && counts.length > 1) {
			counts.splice(counts.indexOf(jokerCount), 1);
			counts[0] = counts[0] + jokerCount;
		}
		return typeByCardCounts(counts);
	}

	function strength(card: Card): number {
		if (card === 'J') return 1;
		return strengthOfCard(card);
	}
}

if (import.meta.main) {
	const input = getInput(7);
	console.log(`Part 1: ${part1(input)}`);
	console.log(`Part 2: ${part2(input)}`);
}
