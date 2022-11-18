import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { PointCreate, PointUpdate } from '../../models/points.models';
import { PointService } from '../../services/point.service';
import {
  createPointError,
  createPointSuccess,
  deletePointError,
  deletePointSuccess,
  getPointsByTaskIdError,
  getPointsByTaskIdSuccess,
  getPointsByUserIdError,
  getPointsByUserIdSuccess,
  updatePointError,
  updatePointSuccess,
} from '../actions/points.actions';
import { IPointError, PointsActions } from '../models/points.models';

@Injectable()
export class PointsEffects {
  getPointsByTaskId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointsActions.GET_POINTS_BY_TASK_ID),
      mergeMap(({ taskId }: { taskId: string }) => {
        return this.pointService.getPointsByTaskId(taskId).pipe(
          map((points) => getPointsByTaskIdSuccess({ points })),
          catchError((error: IPointError) => of(getPointsByTaskIdError({ error }))),
        );
      }),
    );
  });

  getPointsByUserId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointsActions.GET_POINTS_BY_USER_ID),
      mergeMap(({ userId }: { userId: string }) => {
        return this.pointService.getPointsByUserId(userId).pipe(
          map((points) => getPointsByUserIdSuccess({ points })),
          catchError((error: IPointError) => of(getPointsByUserIdError({ error }))),
        );
      }),
    );
  });

  createPoint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointsActions.CREATE_POINT),
      mergeMap(({ newPoint }: { newPoint: PointCreate }) => {
        return this.pointService.createPoint(newPoint).pipe(
          map((point) => createPointSuccess({ point })),
          catchError((error: IPointError) => of(createPointError({ error }))),
        );
      }),
    );
  });

  updatePoint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointsActions.UPDATE_POINT),
      mergeMap(({ updatedPoint, pointId }: { updatedPoint: PointUpdate; pointId: string }) => {
        return this.pointService.updatePoint(pointId, updatedPoint).pipe(
          map((point) => updatePointSuccess({ point })),
          catchError((error: IPointError) => of(updatePointError({ error }))),
        );
      }),
    );
  });

  deletePoint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PointsActions.DELETE_POINT),
      mergeMap(({ pointId }: { pointId: string }) => {
        return this.pointService.deletePoint(pointId).pipe(
          map((point) => deletePointSuccess({ point })),
          catchError((error: IPointError) => of(deletePointError({ error }))),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private pointService: PointService) {}
}
