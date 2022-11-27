import { createReducer, on } from '@ngrx/store';

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
  updateColumnsOrder,
  updateOrderAllColumnsError,
  updateOrderAllColumnsSuccess,
} from '../actions/columns.actions';
import { IColumnsState } from '../models/columns.models';
import { initialColumnsState } from '../state/columns.state';

const columnsReducer = createReducer(
  initialColumnsState,
  on(getColumns, (state): IColumnsState => {
    return { ...state, isLoading: true };
  }),
  on(getColumnsSuccess, (state, { columns }): IColumnsState => {
    const sortedByOrderColumns = [...columns].sort((a, b) => a.order! - b.order!);
    return { ...state, isLoading: false, columns: sortedByOrderColumns };
  }),
  on(getColumnsError, (state, { error }): IColumnsState => {
    return { ...state, isLoading: false, error };
  }),
  on(createColumn, (state): IColumnsState => {
    return { ...state, isLoading: true };
  }),
  on(createColumnSuccess, (state, { newColumn }): IColumnsState => {
    return { ...state, isLoading: false, columns: [...state.columns, newColumn] };
  }),
  on(createColumnError, (state, { error }): IColumnsState => {
    return { ...state, isLoading: false, error };
  }),
  on(deleteColumn, (state): IColumnsState => {
    return { ...state, isLoading: true };
  }),
  on(deleteColumnSuccess, (state, { deletedColumn: { _id: columnId } }): IColumnsState => {
    const resultedColumns = [...state.columns].filter(({ _id }) => _id !== columnId);
    return { ...state, isLoading: false, columns: resultedColumns };
  }),
  on(deleteColumnError, (state, { error }): IColumnsState => {
    return { ...state, isLoading: false, error };
  }),
  on(updateColumn, (state): IColumnsState => {
    return { ...state, isLoading: true };
  }),
  on(updateColumnSuccess, (state): IColumnsState => {
    return { ...state, isLoading: false };
  }),
  on(updateColumnError, (state, { error }): IColumnsState => {
    return { ...state, isLoading: false, error };
  }),
  on(updateColumnsOrder, (state): IColumnsState => {
    return { ...state, isLoading: true };
  }),
  on(updateOrderAllColumnsSuccess, (state): IColumnsState => {
    return { ...state, isLoading: false };
  }),
  on(updateOrderAllColumnsError, (state, { error }): IColumnsState => {
    return { ...state, isLoading: false, error };
  }),
  on(resetColumns, (state): IColumnsState => {
    return { ...state, isLoading: false, columns: [] };
  }),
  on(setColumns, (state, { columns }): IColumnsState => {
    return { ...state, isLoading: false, columns };
  }),
);

export { columnsReducer };
