import { Item } from "./../types/Item";

export const calculateBonusTime = (items: Item[]) => {
  const mistakes = items.filter(x => x.mistakes > 0).length;
  return mistakes > 0 ? 0 : 3;
};
