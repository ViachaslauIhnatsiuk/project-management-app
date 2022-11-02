import { createAction, props } from '@ngrx/store';
import { IBoard } from '../../models/boards.models';
import { BoardsActions } from '../models/boards.models';

const getBoards = createAction(BoardsActions.GET_BOARDS);
const getBoardsSuccess = createAction(
  BoardsActions.GET_BOARDS_SUCCESS,
  props<{ boards: IBoard[] }>(),
);
const getBoardsError = createAction(BoardsActions.GET_BOARDS_ERROR, props<{ error: string }>());

const createBoard = createAction(BoardsActions.CREATE_BOARD, props<{ newBoard: IBoard }>());
const createBoardSuccess = createAction(
  BoardsActions.CREATE_BOARD_SUCCESS,
  props<{ newBoard: IBoard }>(),
);
const createBoardError = createAction(BoardsActions.CREATE_BOARD_ERROR, props<{ error: string }>());

export {
  getBoards,
  getBoardsSuccess,
  getBoardsError,
  createBoard,
  createBoardSuccess,
  createBoardError,
};
