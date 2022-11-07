import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
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
} from '../actions/column.actions';
import {
  ColumnActions,
  CreateColumnProps,
  DeleteColumnProps,
  UpdateColumnProps,
} from '../models/column.models';

@Injectable()
export class ColumnEffects {
  getColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.GET_COLUMNS),
      mergeMap(({ idBoard }: { idBoard: string }) => {
        return this.columnService.getColumns(idBoard).pipe(
          map((columns) => getColumnsSuccess({ columns })),
          catchError((error: Error) => of(getColumnsError({ error: error.message }))),
        );
      }),
    );
  });

  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.CREATE_COLUMN),
      mergeMap(({ props: { idBoard, newColumn } }: { props: CreateColumnProps }) => {
        return this.columnService.createColumn(idBoard, newColumn).pipe(
          map((column) => createColumnSuccess({ newColumn: column })),
          catchError((error: Error) => of(createColumnError({ error: error.message }))),
        );
      }),
    );
  });

  deleteColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.DELETE_COLUMN),
      mergeMap(({ props: { idBoard, idColumn } }: { props: DeleteColumnProps }) => {
        return this.columnService.deleteColumn(idColumn, idBoard).pipe(
          map(() => deleteColumnSuccess({ idColumn })),
          catchError((error: Error) => of(deleteColumnError({ error: error.message }))),
        );
      }),
    );
  });

  updateColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.UPDATE_COLUMN),
      mergeMap(({ props: { column, idBoard } }: { props: UpdateColumnProps }) => {
        return this.columnService.updateColumn(column, idBoard).pipe(
          map((updatedColumn) => updateColumnSuccess({ updatedColumn })),
          catchError((error: Error) => of(updateColumnError({ error: error.message }))),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private columnService: ColumnService) {}
}
