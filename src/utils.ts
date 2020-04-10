import { Card, Rate } from './types';
import defaultCards from './cards';

export const stringifyCards = (cards: Card[]) => (
  JSON.stringify(
    cards.map(({ name, rate }: Card) => ({ name, rate })),
  )
);

export const parseCards = (cards: string = '{}') => JSON.parse(cards);

export const getCardsFromURL = () => {
  const cardsFromURL = parseCards(new URLSearchParams(window.location.search).get('cards') || '[]');
  return (cardsFromURL.length === defaultCards.length
    ? cardsFromURL
    : defaultCards
  ).map((card: Card) => ({
    rate: Rate.Neutral,
    ...cardsFromURL.find(({ name }: Card) => name === card.name),
    ...defaultCards.find(({ name }: Card) => name === card.name),
  }));
};

export const setCardsInURL = (cards: Card[]) => {
  const { protocol, host, pathname } = window.location;
  const newurl = `${protocol}//${host}${pathname}?cards=${stringifyCards(cards)}`;
  window.history.pushState({ path: newurl }, '', newurl);
};
