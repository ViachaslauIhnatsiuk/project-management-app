import { IBoard } from '../../models/boards.models';

interface IBoardsState {
  boards: IBoard[];
  token: string;
  isLoading: boolean;
  error: string;
}

enum BoardsActions {
  GET_BOARDS = '[Boards] Get Boards',
  GET_BOARDS_SUCCESS = '[Boards] Get Boards success',
  GET_BOARDS_ERROR = '[Boards] Get Boards error',
  CREATE_BOARD = '[Boards] Create Board Boards',
  CREATE_BOARD_SUCCESS = '[Boards] Create Board success',
  CREATE_BOARD_ERROR = '[Boards] Create Board Boards error',
  SET_TOKEN = '[Boards] Set Token',
}

export type { IBoardsState };
export { BoardsActions };
