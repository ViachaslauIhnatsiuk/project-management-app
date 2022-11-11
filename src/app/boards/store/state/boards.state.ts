import { IBoardsState } from '../models/boards.models';
import { getUserId } from '../../helpers/boards.helpers';

const initialBoardsState: IBoardsState = {
  boards: [],
  columns: [],
  tasks: [],
  isLoading: false,
  error: '',
  userId: getUserId(),
};

export { initialBoardsState };
