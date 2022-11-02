import { IBoardsState } from '../models/boards.models';

const initialBoardsState: IBoardsState = {
  boards: [],
  token: '',
  isLoading: false,
  error: '',
};

export { initialBoardsState };
