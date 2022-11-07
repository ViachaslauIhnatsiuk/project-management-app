import { IBoardsState } from '../models/boards.models';

const initialBoardsState: IBoardsState = {
  boards: [],
  columns: [],
  tasks: [],
  token: '',
  isLoading: false,
  error: '',
};

export { initialBoardsState };
