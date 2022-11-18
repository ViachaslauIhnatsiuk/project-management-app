import { IPoints } from '../../models/points.models';

interface IPointsState {
  points: IPoints;
  error: IPointError | null;
  isLoading: boolean;
}

enum PointsActions {
  CREATE_POINT = '[Points] Create Point',
  CREATE_POINT_SUCCESS = '[Points] Create Point success',
  CREATE_POINT_ERROR = '[Points] Create Point error',
  GET_POINTS_BY_TASK_ID = '[Points] Get Points By Task Id',
  GET_POINTS_BY_TASK_ID_SUCCESS = '[Points] Get Points By Task Id success',
  GET_POINTS_BY_TASK_ID_ERROR = '[Points] Get Points By Task Id error',
  GET_POINTS_BY_USER_ID = '[Points] Get Points By userId',
  GET_POINTS_BY_USER_ID_SUCCESS = '[Points] Get Points By userId success',
  GET_POINTS_BY_USER_ID_ERROR = '[Points] Get Points By userId error',
  UPDATE_POINT = '[Points] Update Point By Id',
  UPDATE_POINT_SUCCESS = '[Points] Update Point By Id success',
  UPDATE_POINT_ERROR = '[Points] Update Point By Id error',
  DELETE_POINT = '[Points] Delete Point By Id',
  DELETE_POINT_SUCCESS = '[Points] Delete Point By Id success',
  DELETE_POINT_ERROR = '[Points] Delete Point By Id error',
}

interface IPointError {
  statusCode: string;
  message: string;
}

export { PointsActions };
export type { IPointsState, IPointError };
