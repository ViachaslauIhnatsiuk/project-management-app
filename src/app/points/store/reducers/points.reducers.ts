import { createReducer, on } from '@ngrx/store';
import { IPoints } from '../../models/points.models';
import {
  createPoint,
  createPointError,
  createPointSuccess,
  deletePoint,
  deletePointError,
  deletePointSuccess,
  getPointsByTaskId,
  getPointsByTaskIdError,
  getPointsByTaskIdSuccess,
  getPointsByUserId,
  getPointsByUserIdError,
  getPointsByUserIdSuccess,
  updatePoint,
  updatePointError,
  updatePointSuccess,
} from '../actions/points.actions';
import { IPointsState } from '../models/points.models';
import { initialPointsState } from '../state/points.state';

const pointsReducer = createReducer(
  initialPointsState,
  on(getPointsByTaskId, (state): IPointsState => {
    return { ...state, isLoading: true };
  }),
  on(getPointsByTaskIdSuccess, (state): IPointsState => {
    return { ...state, isLoading: false };
  }),
  on(getPointsByTaskIdError, (state, { error }): IPointsState => {
    return { ...state, isLoading: false, error };
  }),
  on(getPointsByUserId, (state): IPointsState => {
    return { ...state, isLoading: true };
  }),
  on(getPointsByUserIdSuccess, (state, { points }): IPointsState => {
    const resultPoints: IPoints = {};

    points.forEach((point) => {
      const taskId = point.taskId;
      const pointsById = resultPoints[taskId] || [];
      const newPoints = [...pointsById, point];
      resultPoints[taskId] = newPoints;
    });

    return { ...state, isLoading: false, points: resultPoints };
  }),
  on(getPointsByUserIdError, (state, { error }): IPointsState => {
    return { ...state, isLoading: false, error };
  }),
  on(createPoint, (state): IPointsState => {
    return { ...state, isLoading: true };
  }),
  on(createPointSuccess, (state, { point }): IPointsState => {
    const points = { ...state.points };
    const taskId = point.taskId;
    let prevPoints = points[taskId] || [];
    const newPoints = [...prevPoints, point];
    points[taskId] = newPoints;

    return { ...state, isLoading: false, points };
  }),
  on(createPointError, (state, { error }): IPointsState => {
    return { ...state, isLoading: false, error };
  }),
  on(updatePoint, (state): IPointsState => {
    return { ...state, isLoading: true };
  }),
  on(updatePointSuccess, (state, { point }): IPointsState => {
    const points = { ...state.points };
    const taskId = point.taskId;
    let prevPoints = [...points[taskId]] || [];
    const indexUpdatedPoint = prevPoints.findIndex((prevPoint) => prevPoint._id === point._id);
    prevPoints.splice(indexUpdatedPoint, 1, point);
    points[taskId] = prevPoints;

    return { ...state, isLoading: false, points };
  }),
  on(updatePointError, (state, { error }): IPointsState => {
    return { ...state, isLoading: false, error };
  }),
  on(deletePoint, (state): IPointsState => {
    return { ...state, isLoading: true };
  }),
  on(deletePointSuccess, (state, { point }): IPointsState => {
    const points = { ...state.points };
    const taskId = point.taskId;
    let prevPoints = points[taskId] || [];
    const newPoints = prevPoints.filter((prevPoint) => prevPoint._id !== point._id);
    points[taskId] = newPoints;

    return { ...state, isLoading: false, points };
  }),
  on(deletePointError, (state, { error }): IPointsState => {
    return { ...state, isLoading: false, error };
  }),
);

export { pointsReducer };
