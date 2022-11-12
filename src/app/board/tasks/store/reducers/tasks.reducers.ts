import { createReducer, on } from '@ngrx/store';

import { initialTasksState } from '../state/tasks.state';

import {
  createTask,
  createTaskSuccess,
  deleteTask,
  deleteTaskError,
  deleteTaskSuccess,
  getTasks,
  getTasksError,
  getTasksSuccess,
  setTasksById,
  updateOrderAllTasks,
  updateOrderAllTasksError,
  updateOrderAllTasksSuccess,
  updateTask,
  updateTaskError,
  updateTaskSuccess,
} from '../actions/task.actions';
import { ITasksState } from '../models/task.models';

const tasksReducer = createReducer(
  initialTasksState,
  on(getTasks, (state): ITasksState => {
    return { ...state, isLoading: true };
  }),
  on(getTasksSuccess, (state, { tasks, columnId }): ITasksState => {
    const updatedTasks = { ...state.tasks };
    updatedTasks[columnId] = [...tasks].sort((a, b) => Number(a.order) - Number(b.order));

    return { ...state, isLoading: false, tasks: updatedTasks };
  }),
  on(getTasksError, (state, { error }): ITasksState => {
    return { ...state, isLoading: false, error };
  }),
  on(createTask, (state): ITasksState => {
    return { ...state, isLoading: true };
  }),
  on(createTaskSuccess, (state, { newTask }): ITasksState => {
    const updatedTasks = { ...state.tasks };
    const columnId = newTask.columnId as string;
    updatedTasks[columnId] = [...updatedTasks[columnId], newTask];

    return { ...state, isLoading: false, tasks: updatedTasks };
  }),
  on(deleteTask, (state): ITasksState => {
    return { ...state, isLoading: true };
  }),
  on(deleteTaskSuccess, (state, { task: deletedTask }): ITasksState => {
    const updatedTasks = { ...state.tasks };
    const columnId = deletedTask.columnId as string;
    updatedTasks[columnId] = updatedTasks[columnId].filter((task) => task._id !== deletedTask._id);

    return { ...state, isLoading: false, tasks: updatedTasks };
  }),
  on(deleteTaskError, (state, { error }): ITasksState => {
    return { ...state, isLoading: false, error };
  }),
  on(updateTask, (state): ITasksState => {
    return { ...state, isLoading: true };
  }),
  on(updateTaskSuccess, (state, { updatedTask }): ITasksState => {
    const updatedTasks = { ...state.tasks };
    const columnId = updatedTask.columnId as string;
    const columnTasks = [...updatedTasks[columnId]];

    const indexOldTask = columnTasks.findIndex((task) => task._id === updatedTask._id);

    columnTasks[indexOldTask] = updatedTask;

    updatedTasks[columnId] = columnTasks;

    return { ...state, isLoading: false, tasks: updatedTasks };
  }),
  on(updateTaskError, (state, { error }): ITasksState => {
    return { ...state, isLoading: false, error };
  }),

  on(updateOrderAllTasks, (state): ITasksState => {
    return { ...state, isLoading: true };
  }),
  on(updateOrderAllTasksSuccess, (state): ITasksState => {
    return { ...state, isLoading: false };
  }),
  on(updateOrderAllTasksError, (state, { error }): ITasksState => {
    return { ...state, isLoading: false, error };
  }),
  on(setTasksById, (state, { tasks, columnId }): ITasksState => {
    const updatedTasks = { ...state.tasks };
    updatedTasks[columnId] = tasks;
    return { ...state, tasks: updatedTasks };
  }),
);

export { tasksReducer };
