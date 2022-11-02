import { createAction, props } from '@ngrx/store';
import { IBoard } from '../../models/boards.models';
import { BoardsActions } from '../models/boards.models';

const getBoards = createAction(BoardsActions.GET_BOARDS);
const getBoardsSuccess = createAction(
  BoardsActions.GET_BOARDS_SUCCESS,
  props<{ boards: IBoard[] }>(),
);
const getBoardsError = createAction(BoardsActions.GET_BOARDS_ERROR, props<{ error: string }>());

export { getBoards, getBoardsSuccess, getBoardsError };
