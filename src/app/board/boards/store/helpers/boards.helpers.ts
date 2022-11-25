import { IBoard } from '../../models/boards.models';
import { BoardFilters, BoardSortTypes } from '../models/boards.models';

const sortBoardsBySortType = (boards: IBoard[], sortType: BoardSortTypes): IBoard[] => {
  let sortedBoards: IBoard[] = [...boards];

  switch (sortType) {
    case BoardSortTypes.TITLE_ASC:
      return sortedBoards.sort((a, b) =>
        a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase()),
      );
    case BoardSortTypes.TITLE_DESC:
      return sortedBoards.sort((a, b) =>
        b.title.toLocaleLowerCase().localeCompare(a.title.toLocaleLowerCase()),
      );
    default:
      return sortedBoards;
  }
};

const filterBoards = (boards: IBoard[], { byTitle, byOwner }: BoardFilters): IBoard[] => {
  let filteredBoards: IBoard[] = [...boards];

  if (byTitle) {
    filteredBoards = filteredBoards.filter((board) =>
      board.title.toLocaleLowerCase().includes(byTitle),
    );
  }

  if (byOwner) {
    filteredBoards = filteredBoards.filter((board) => board.owner === byOwner);
  }

  return filteredBoards;
};

export { sortBoardsBySortType, filterBoards };
