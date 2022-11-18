import { createAction, props } from '@ngrx/store';
import { IPoint, PointCreate, PointUpdate } from '../../models/points.models';
import { IPointError, PointsActions } from '../models/points.models';

const getPointsByTaskId = createAction(
  PointsActions.GET_POINTS_BY_TASK_ID,
  props<{ taskId: string }>(),
);
const getPointsByTaskIdSuccess = createAction(
  PointsActions.GET_POINTS_BY_TASK_ID_SUCCESS,
  props<{ points: IPoint[] }>(),
);
const getPointsByTaskIdError = createAction(
  PointsActions.GET_POINTS_BY_TASK_ID_ERROR,
  props<{ error: IPointError }>(),
);

const getPointsByUserId = createAction(
  PointsActions.GET_POINTS_BY_USER_ID,
  props<{ userId: string }>(),
);
const getPointsByUserIdSuccess = createAction(
  PointsActions.GET_POINTS_BY_USER_ID_SUCCESS,
  props<{ points: IPoint[] }>(),
);
const getPointsByUserIdError = createAction(
  PointsActions.GET_POINTS_BY_USER_ID_ERROR,
  props<{ error: IPointError }>(),
);

const createPoint = createAction(PointsActions.CREATE_POINT, props<{ newPoint: PointCreate }>());
const createPointSuccess = createAction(
  PointsActions.CREATE_POINT_SUCCESS,
  props<{ point: IPoint }>(),
);
const createPointError = createAction(
  PointsActions.CREATE_POINT_ERROR,
  props<{ error: IPointError }>(),
);

const updatePoint = createAction(
  PointsActions.UPDATE_POINT,
  props<{ updatedPoint: PointUpdate; pointId: string }>(),
);
const updatePointSuccess = createAction(
  PointsActions.UPDATE_POINT_SUCCESS,
  props<{ point: IPoint }>(),
);
const updatePointError = createAction(
  PointsActions.UPDATE_POINT_ERROR,
  props<{ error: IPointError }>(),
);

const deletePoint = createAction(PointsActions.DELETE_POINT, props<{ pointId: string }>());
const deletePointSuccess = createAction(
  PointsActions.DELETE_POINT_SUCCESS,
  props<{ point: IPoint }>(),
);
const deletePointError = createAction(
  PointsActions.DELETE_POINT_ERROR,
  props<{ error: IPointError }>(),
);

export {
  getPointsByTaskId,
  getPointsByTaskIdSuccess,
  getPointsByTaskIdError,
  createPoint,
  createPointSuccess,
  createPointError,
  updatePoint,
  updatePointSuccess,
  updatePointError,
  deletePoint,
  deletePointSuccess,
  deletePointError,
  getPointsByUserId,
  getPointsByUserIdSuccess,
  getPointsByUserIdError,
};
