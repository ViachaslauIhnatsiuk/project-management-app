import { IBoardsState } from '../models/boards.models';
import { getUserId } from '../../helpers/boards.helpers';

const initialBoardsState: IBoardsState = {
  boards: [],
  isLoading: false,
  error: '',
  userId: getUserId(),
};

export { initialBoardsState };
