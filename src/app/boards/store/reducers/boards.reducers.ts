import { createReducer, on } from '@ngrx/store';
import { initialBoardsState } from '../state/boards.state';
import { IBoardsState } from '../models/boards.models';
import {
  createBoard,
  createBoardError,
  createBoardSuccess,
  deleteBoard,
  deleteBoardError,
  deleteBoardSuccess,
  getBoardById,
  getBoardByIdError,
  getBoardByIdSuccess,
  getBoards,
  getBoardsError,
  getBoardsSuccess,
  updateBoard,
  updateBoardError,
  updateBoardSuccess,
} from '../actions/boards.actions';
import {
  createColumn,
  createColumnError,
  createColumnSuccess,
  deleteColumn,
  deleteColumnError,
  deleteColumnSuccess,
  getColumns,
  getColumnsError,
  getColumnsSuccess,
  resetColumns,
  setColumns,
  updateColumn,
  updateColumnError,
  updateColumnSuccess,
  updateOrderAllColumns,
  updateOrderAllColumnsError,
  updateOrderAllColumnsSuccess,
} from '../actions/column.actions';
import { IColumn } from '../../models/boards.models';

const boardsReducer = createReducer(
  initialBoardsState,
  on(getBoards, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(getBoardsSuccess, (state, { boards }): IBoardsState => {
    return { ...state, isLoading: false, boards };
  }),
  on(getBoardsError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(createBoard, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(createBoardSuccess, (state, { newBoard }): IBoardsState => {
    return { ...state, isLoading: false, boards: [...state.boards, newBoard] };
  }),
  on(createBoardError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(getBoardById, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(getBoardByIdSuccess, (state, { board: { columns } }): IBoardsState => {
    const sortedByOrderColumns = [...columns].sort((a, b) => a.order! - b.order!);
    return { ...state, isLoading: false, columns: sortedByOrderColumns };
  }),
  on(getBoardByIdError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(deleteBoard, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(deleteBoardSuccess, (state, { boardId }): IBoardsState => {
    const resultedBoards = [...state.boards].filter(({ _id }) => _id !== boardId);
    return { ...state, isLoading: false, boards: resultedBoards };
  }),
  on(deleteBoardError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(updateBoard, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(updateBoardSuccess, (state, { updatedBoard }): IBoardsState => {
    const resultedBoards = [...state.boards].map((board) => {
      if (board._id === updatedBoard._id) {
        return updatedBoard;
      }

      return board;
    });

    return { ...state, isLoading: false, boards: resultedBoards };
  }),
  on(updateBoardError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(getColumns, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(getColumnsSuccess, (state, { columns }): IBoardsState => {
    const sortedByOrderColumns = [...columns].sort((a, b) => a.order! - b.order!);
    return { ...state, isLoading: false, columns: sortedByOrderColumns };
  }),
  on(getColumnsError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(createColumn, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(createColumnSuccess, (state, { newColumn }): IBoardsState => {
    const column: IColumn = { ...newColumn, tasks: [] };
    return { ...state, isLoading: false, columns: [...state.columns, column] };
  }),
  on(createColumnError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(deleteColumn, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(deleteColumnSuccess, (state, { columnId }): IBoardsState => {
    const resultedColumns = [...state.columns].filter(({ _id }) => _id !== columnId);
    return { ...state, isLoading: false, columns: resultedColumns };
  }),
  on(deleteColumnError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(updateColumn, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(updateColumnSuccess, (state, { updatedColumn }): IBoardsState => {
    const resultedColumns = [...state.columns].map((column) => {
      if (column._id === updatedColumn._id) {
        return updatedColumn;
      }

      return column;
    });

    return { ...state, isLoading: false, columns: resultedColumns };
  }),
  on(updateColumnError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(updateOrderAllColumns, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(updateOrderAllColumnsSuccess, (state): IBoardsState => {
    return { ...state, isLoading: false };
  }),
  on(updateOrderAllColumnsError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(resetColumns, (state): IBoardsState => {
    return { ...state, isLoading: false, columns: [] };
  }),
  on(setColumns, (state, { columns }): IBoardsState => {
    return { ...state, isLoading: false, columns };
  }),
  on(createColumnError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(deleteColumn, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(deleteColumnSuccess, (state, { columnId }): IBoardsState => {
    const resultedColumns = [...state.columns].filter(({ _id }) => _id !== columnId);
    return { ...state, isLoading: false, columns: resultedColumns };
  }),
  on(deleteColumnError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
  on(updateColumn, (state): IBoardsState => {
    return { ...state, isLoading: true };
  }),
  on(updateColumnSuccess, (state, { updatedColumn }): IBoardsState => {
    const resultedColumns = [...state.columns].map((column) => {
      if (column._id === updatedColumn._id) {
        return updatedColumn;
      }

      return column;
    });
    return { ...state, isLoading: false, columns: resultedColumns };
  }),
  on(updateColumnError, (state, { error }): IBoardsState => {
    return { ...state, isLoading: false, error };
  }),
);

export { boardsReducer };
