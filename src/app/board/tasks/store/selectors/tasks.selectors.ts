import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITasksState } from '../models/task.models';

const selectFeatureTasks = createFeatureSelector<ITasksState>('tasks');

const selectTasks = createSelector(selectFeatureTasks, (state) => state.tasks);

export { selectTasks };
