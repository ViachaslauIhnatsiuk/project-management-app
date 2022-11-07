import { IColumn } from '../../models/boards.models';

interface IColumnState {
  columns: IColumn[];
  token: string;
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
}

type CreateColumnProps = {
  idBoard: string;
  newColumn: IColumn;
};

type DeleteColumnProps = {
  idColumn: string;
  idBoard: string;
};

type UpdateColumnProps = {
  column: IColumn;
  idBoard: string;
};

export type { IColumnState, CreateColumnProps, DeleteColumnProps, UpdateColumnProps };
export { ColumnActions };
