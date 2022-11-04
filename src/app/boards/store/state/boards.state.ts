import { IBoardsState } from '../models/boards.models';

const initialBoardsState: IBoardsState = {
  boards: [],
  selectedForUpdateBoard: null,
  token: '',
  isLoading: false,
  error: '',
};

export { initialBoardsState };
