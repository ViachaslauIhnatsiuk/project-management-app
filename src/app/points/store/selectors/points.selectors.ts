import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPoints } from '../../models/points.models';
import { IPointsState } from '../models/points.models';

const selectFeaturePoints = createFeatureSelector<IPointsState>('points');

const selectPoints = createSelector(selectFeaturePoints, (state): IPoints => state.points);

export { selectPoints };
