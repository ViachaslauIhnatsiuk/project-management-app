import { createAction, props } from '@ngrx/store';
import { IBoard } from '../../models/boards.models';
import { BoardsActions, BoardSortTypes } from '../models/boards.models';

const getBoards = createAction(BoardsActions.GET_BOARDS);
const getBoardsSuccess = createAction(
  BoardsActions.GET_BOARDS_SUCCESS,
  props<{ boards: IBoard[] }>(),
);
const getBoardsError = createAction(BoardsActions.GET_BOARDS_ERROR, props<{ error: string }>());

const getBoardById = createAction(BoardsActions.GET_BOARD_BY_ID, props<{ boardId: string }>());
const getBoardByIdSuccess = createAction(
  BoardsActions.GET_BOARD_BY_ID_SUCCESS,
  props<{ board: IBoard }>(),
);
const getBoardByIdError = createAction(
  BoardsActions.GET_BOARD_BY_ID_ERROR,
  props<{ error: string }>(),
);

const getBoardsByUserId = createAction(
  BoardsActions.GET_BOARDS_BY_USER_ID,
  props<{ userId: string }>(),
);
const getBoardsByUserIdSuccess = createAction(
  BoardsActions.GET_BOARDS_BY_USER_ID_SUCCESS,
  props<{ boards: IBoard[] }>(),
);
const getBoardsByUserIdError = createAction(
  BoardsActions.GET_BOARDS_BY_USER_ID_ERROR,
  props<{ error: string }>(),
);

const createBoard = createAction(BoardsActions.CREATE_BOARD, props<{ newBoard: IBoard }>());
const createBoardSuccess = createAction(
  BoardsActions.CREATE_BOARD_SUCCESS,
  props<{ newBoard: IBoard }>(),
);
const createBoardError = createAction(BoardsActions.CREATE_BOARD_ERROR, props<{ error: string }>());

const deleteBoard = createAction(BoardsActions.DELETE_BOARD, props<{ boardId: string }>());
const deleteBoardSuccess = createAction(
  BoardsActions.DELETE_BOARD_SUCCESS,
  props<{ boardId: string }>(),
);
const deleteBoardError = createAction(BoardsActions.DELETE_BOARD_ERROR, props<{ error: string }>());

const updateBoard = createAction(BoardsActions.UPDATE_BOARD, props<{ board: IBoard }>());
const updateBoardSuccess = createAction(
  BoardsActions.UPDATE_BOARD_SUCCESS,
  props<{ updatedBoard: IBoard }>(),
);
const updateBoardError = createAction(BoardsActions.UPDATE_BOARD_ERROR, props<{ error: string }>());

const setBoardFilterByTitle = createAction(
  BoardsActions.SET_FILTER_BY_TITLE,
  props<{ value: string }>(),
);

const setBoardSortType = createAction(
  BoardsActions.SET_SORT_TYPE,
  props<{ sortType: BoardSortTypes }>(),
);

export {
  getBoards,
  getBoardsSuccess,
  getBoardsError,
  getBoardById,
  getBoardByIdSuccess,
  getBoardByIdError,
  getBoardsByUserId,
  getBoardsByUserIdSuccess,
  getBoardsByUserIdError,
  createBoard,
  createBoardSuccess,
  createBoardError,
  deleteBoard,
  deleteBoardSuccess,
  deleteBoardError,
  updateBoard,
  updateBoardSuccess,
  updateBoardError,
  setBoardFilterByTitle,
  setBoardSortType,
};
