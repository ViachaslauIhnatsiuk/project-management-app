import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { IColumn } from '../../models/columns.models';
import { ColumnService } from '../../services/column.service';
import {
  createColumnError,
  createColumnSuccess,
  deleteColumnError,
  deleteColumnSuccess,
  getColumnsError,
  getColumnsSuccess,
  updateColumnError,
  updateColumnSuccess,
  updateOrderAllColumnsSuccess,
} from '../actions/columns.actions';
import {
  ColumnActions,
  CreateColumnProps,
  DeleteColumnProps,
  UpdateColumnProps,
} from '../models/columns.models';

@Injectable()
export class ColumnEffects {
  getColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.GET_COLUMNS),
      mergeMap(({ boardId }: { boardId: string }) => {
        return this.columnService.getColumns(boardId).pipe(
          map((columns) => getColumnsSuccess({ columns })),
          catchError(({ message }: Error) => of(getColumnsError({ error: message }))),
        );
      }),
    );
  });

  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.CREATE_COLUMN),
      mergeMap(({ props: { boardId, newColumn } }: { props: CreateColumnProps }) => {
        return this.columnService.createColumn(boardId, newColumn).pipe(
          map((column) => createColumnSuccess({ newColumn: column })),
          catchError(({ message }: Error) => of(createColumnError({ error: message }))),
        );
      }),
    );
  });

  deleteColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.DELETE_COLUMN),
      mergeMap(({ props: { boardId, columnId } }: { props: DeleteColumnProps }) => {
        return this.columnService.deleteColumn(columnId, boardId).pipe(
          map(() => deleteColumnSuccess({ columnId })),
          catchError(({ message }: Error) => of(deleteColumnError({ error: message }))),
        );
      }),
    );
  });

  updateColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.UPDATE_COLUMN),
      mergeMap(({ props: { column: updatedColumn, boardId } }: { props: UpdateColumnProps }) => {
        return this.columnService.updateColumn(updatedColumn, boardId).pipe(
          map(() => updateColumnSuccess({ updatedColumn })),
          catchError(({ message }: Error) => of(updateColumnError({ error: message }))),
        );
      }),
    );
  });

  updateColumnsOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.UPDATE_ORDER_COLUMNS),
      mergeMap(({ columns }: { columns: IColumn[] }) => {
        return this.columnService.updateColumnsOrder(columns).pipe(
          map((updatedColumns) => updateOrderAllColumnsSuccess({ updatedColumns })),
          catchError(({ message }: Error) => of(updateColumnError({ error: message }))),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private columnService: ColumnService) {}
}
