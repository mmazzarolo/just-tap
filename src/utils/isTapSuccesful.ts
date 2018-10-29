import { Item } from "../types/Item";

export const isTapSuccessful = (board: Item[], tappedItemIndex: number) => {
  const tappedItem = board[tappedItemIndex];
  const highestBoardValue = Math.min(
    ...board.filter(x => !!x.isActive).map(x => x.value)
  );
  const isValid = tappedItem.value <= highestBoardValue;
  return isValid;
};
