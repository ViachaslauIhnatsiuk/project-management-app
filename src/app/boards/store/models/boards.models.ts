import { IBoard } from '../../models/boards.models';

interface IBoardsState {
  boards: IBoard[];
  selectedForUpdateBoard: IBoard | null;
  token: string;
  isLoading: boolean;
  error: string;
}

enum BoardsActions {
  GET_BOARDS = '[Boards] Get Boards',
  GET_BOARDS_SUCCESS = '[Boards] Get Boards success',
  GET_BOARDS_ERROR = '[Boards] Get Boards error',
  CREATE_BOARD = '[Boards] Create Board',
  CREATE_BOARD_SUCCESS = '[Boards] Create Board success',
  CREATE_BOARD_ERROR = '[Boards] Create Board Boards error',
  DELETE_BOARD = '[Boards] Delete Board',
  DELETE_BOARD_SUCCESS = '[Boards] Delete Board success',
  DELETE_BOARD_ERROR = '[Boards] Delete Board Boards error',
  SET_ID_UPDATED_BOARD = '[Boards] Set Id Updated Board',
  UPDATE_BOARD = '[Boards] Update Board',
  UPDATE_BOARD_SUCCESS = '[Boards] Update Board success',
  UPDATE_BOARD_ERROR = '[Boards] Update Board Boards error',
  SET_TOKEN = '[Boards] Set Token',
}

export type { IBoardsState };
export { BoardsActions };
