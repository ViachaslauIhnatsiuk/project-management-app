import { IColumn } from '../../models/columns.models';

interface IColumnsState {
  columns: IColumn[];
  isLoading: boolean;
  error: string;
}

enum ColumnActions {
  GET_COLUMNS = '[Project Page] Get Columns',
  GET_COLUMNS_SUCCESS = '[Project Page] Get Columns success',
  GET_COLUMNS_ERROR = '[Project Page] Get Columns error',
  CREATE_COLUMN = '[Project Page] Create Column',
  CREATE_COLUMN_SUCCESS = '[Project Page] Create Column success',
  CREATE_COLUMN_ERROR = '[Project Page] Create Column error',
  DELETE_COLUMN = '[Project Page] Delete Column',
  DELETE_COLUMN_SUCCESS = '[Project Page] Delete Column success',
  DELETE_COLUMN_ERROR = '[Project Page] Delete Column error',
  UPDATE_COLUMN = '[Project Page] Update Column',
  UPDATE_COLUMN_SUCCESS = '[Project Page] Update Column success',
  UPDATE_COLUMN_ERROR = '[Project Page] Update Column error',
  UPDATE_ORDER_COLUMNS = '[Project Page] Update Order Columns',
  UPDATE_ORDER_COLUMNS_SUCCESS = '[Project Page] Update Order Columns success',
  UPDATE_ORDER_COLUMNS_ERROR = '[Project Page] Update Order Columns error',
  RESET_COLUMNS = '[Project Page] Reset Columns',
  SET_COLUMNS = '[Project Page] Set Columns',
}

type CreateColumnProps = {
  boardId: string;
  newColumn: IColumn;
};

export type { CreateColumnProps, IColumnsState };
export { ColumnActions };
