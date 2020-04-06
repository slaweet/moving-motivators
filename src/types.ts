export enum Rate {
  Low = -1,
  Neutral = 0,
  High = 1,
}

export interface Card {
  name: string
  description: string
  color: string
  icon: string
  rate?: Rate
}
