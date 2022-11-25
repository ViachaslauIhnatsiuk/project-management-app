import { IBoardsState, BoardSortTypes } from '../models/boards.models';

const initialBoardsState: IBoardsState = {
  boards: [],
  selectedBoard: null,
  sortType: BoardSortTypes.INITIAL,
  filters: { byTitle: '', byOwner: '' },
  isLoading: false,
  error: '',
};

export { initialBoardsState };
