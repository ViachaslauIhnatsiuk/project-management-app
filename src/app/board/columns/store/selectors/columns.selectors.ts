import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IColumnsState } from '../models/columns.models';

const selectFeatureBoards = createFeatureSelector<IColumnsState>('columns');

const selectColumns = createSelector(selectFeatureBoards, (state) => state.columns);

export { selectFeatureBoards, selectColumns };
