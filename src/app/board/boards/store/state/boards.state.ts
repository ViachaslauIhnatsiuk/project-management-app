import { getInitialStateFilters, getInitialStateSortType } from '../helpers/boards.helpers';
import { IBoardsState } from '../models/boards.models';

const initialBoardsState: IBoardsState = {
  boards: [],
  selectedBoard: null,
  sortType: getInitialStateSortType(),
  filters: getInitialStateFilters(),
  isLoading: false,
  error: '',
};

export { initialBoardsState };
