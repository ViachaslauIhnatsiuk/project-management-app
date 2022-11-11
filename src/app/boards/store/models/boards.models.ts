import { IBoard, IColumn, ITask } from '../../models/boards.models';

interface IBoardsState {
  boards: IBoard[];
  columns: IColumn[];
  tasks: ITask[];
  isLoading: boolean;
  error: string;
  userId: string | null;
}

enum BoardsActions {
  GET_BOARDS = '[Boards] Get Boards',
  GET_BOARDS_SUCCESS = '[Boards] Get Boards success',
  GET_BOARDS_ERROR = '[Boards] Get Boards error',
  CREATE_BOARD = '[Boards] Create Board',
  CREATE_BOARD_SUCCESS = '[Boards] Create Board success',
  CREATE_BOARD_ERROR = '[Boards] Create Board Boards error',
  GET_BOARD_BY_ID = '[Boards] Get Board By Id',
  GET_BOARD_BY_ID_SUCCESS = '[Boards] Get Board By Id success',
  GET_BOARD_BY_ID_ERROR = '[Boards] Get Board By Id Boards error',
  DELETE_BOARD = '[Boards] Delete Board',
  DELETE_BOARD_SUCCESS = '[Boards] Delete Board success',
  DELETE_BOARD_ERROR = '[Boards] Delete Board Boards error',
  UPDATE_BOARD = '[Boards] Update Board',
  UPDATE_BOARD_SUCCESS = '[Boards] Update Board success',
  UPDATE_BOARD_ERROR = '[Boards] Update Board Boards error',
  SET_TOKEN = '[Boards] Set Token',
}

export type { IBoardsState };
export { BoardsActions };
