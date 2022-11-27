import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IColumnsState } from '../models/columns.models';

const selectFeatureColumns = createFeatureSelector<IColumnsState>('columns');

const selectColumns = createSelector(selectFeatureColumns, (state) => state.columns);

const selectColumnsIsLoading = createSelector(selectFeatureColumns, (state) => state.isLoading);

export { selectColumns, selectColumnsIsLoading };
