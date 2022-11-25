import { IBoard } from '../../models/boards.models';

interface IBoardsState {
  boards: IBoard[];
  selectedBoard: IBoard | null;
  sortType: BoardSortTypes;
  filters: BoardFilters;
  isLoading: boolean;
  error: string;
}

enum BoardSortTypes {
  TITLE_ASC = 'title_asc',
  TITLE_DESC = 'title_desc',
  INITIAL = '',
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
  GET_BOARDS_BY_USER_ID = '[Boards] Get Boards By User Id',
  GET_BOARDS_BY_USER_ID_SUCCESS = '[Boards] Get Boards By User Id success',
  GET_BOARDS_BY_USER_ID_ERROR = '[Boards] Get Boards By User Id error',
  DELETE_BOARD = '[Boards] Delete Board',
  DELETE_BOARD_SUCCESS = '[Boards] Delete Board success',
  DELETE_BOARD_ERROR = '[Boards] Delete Board Boards error',
  UPDATE_BOARD = '[Boards] Update Board',
  UPDATE_BOARD_SUCCESS = '[Boards] Update Board success',
  UPDATE_BOARD_ERROR = '[Boards] Update Board Boards error',
  SET_TOKEN = '[Boards] Set Token',
  SET_FILTER_BY_TITLE = '[Boards] Set Filter By Title',
  SET_SORT_TYPE = '[Boards] Set Sort Type',
}

type BoardFilters = {
  byTitle: string;
  byOwner: string;
};

export type { IBoardsState, BoardFilters };
export { BoardsActions, BoardSortTypes };
