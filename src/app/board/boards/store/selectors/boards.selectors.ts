import { createFeatureSelector, createSelector } from '@ngrx/store';
import { filterBoards, sortBoardsBySortType } from '../helpers/boards.helpers';
import { IBoardsState } from '../models/boards.models';

const selectFeatureBoards = createFeatureSelector<IBoardsState>('boards');

const selectBoards = createSelector(selectFeatureBoards, ({ boards, sortType, filters }) => {
  let resultedBoards = [...boards];

  if (sortType) {
    resultedBoards = sortBoardsBySortType(resultedBoards, sortType);
  }

  resultedBoards = filterBoards(resultedBoards, filters);

  return resultedBoards;
});

const selectActiveBoard = createSelector(selectFeatureBoards, (state) => state.selectedBoard);

const selectBoardSortType = createSelector(selectFeatureBoards, (state) => state.sortType);

export { selectBoards, selectActiveBoard, selectBoardSortType };
