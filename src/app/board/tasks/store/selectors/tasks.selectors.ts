import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITasksState } from '../models/task.models';

const selectFeatureBoards = createFeatureSelector<ITasksState>('tasks');

const selectTasks = createSelector(selectFeatureBoards, (state) => state.tasks);

export { selectFeatureBoards, selectTasks };
