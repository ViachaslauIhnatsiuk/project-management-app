import { IBoardsState } from '../models/boards.models';

const initialBoardsState: IBoardsState = {
  boards: [],
  selectedBoard: null,
  isLoading: false,
  error: '',
  userId: null,
};

export { initialBoardsState };
