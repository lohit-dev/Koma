import { createEmptyCard, fsrs, Rating, type Card } from "ts-fsrs";

const scheduler = fsrs({ enable_fuzz: true });

export { createEmptyCard, Rating };
export type { Card };

/** Apply a rating to a card and return its next state. */
export const review = (
  card: Card,
  rating: Exclude<Rating, Rating.Manual>,
  now = new Date(),
) => scheduler.next(card, now, rating).card;
