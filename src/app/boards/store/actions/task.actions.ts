import { createAction, props } from '@ngrx/store';
import { ITask } from '../../models/boards.models';
import { DeleteTaskProps, GetTasksProps, TaskActions } from '../models/task.models';

const getTasks = createAction(TaskActions.GET_TASKS, props<{ props: GetTasksProps }>());
const getTasksSuccess = createAction(
  TaskActions.GET_TASKS_SUCCESS,
  props<{ tasks: ITask[]; columnId: string }>(),
);
const getTasksError = createAction(TaskActions.GET_TASKS_ERROR, props<{ error: string }>());

const createTask = createAction(TaskActions.CREATE_TASK, props<{ newTask: ITask }>());
const createTaskSuccess = createAction(
  TaskActions.CREATE_TASK_SUCCESS,
  props<{ newTask: ITask }>(),
);
const createTaskError = createAction(TaskActions.CREATE_TASK_ERROR, props<{ error: string }>());

const deleteTask = createAction(TaskActions.DELETE_TASK, props<{ props: DeleteTaskProps }>());
const deleteTaskSuccess = createAction(
  TaskActions.DELETE_TASK_SUCCESS,
  props<{ idTask: string; columnId: string }>(),
);
const deleteTaskError = createAction(TaskActions.DELETE_TASK_ERROR, props<{ error: string }>());

const updateTask = createAction(TaskActions.UPDATE_TASK, props<{ updatedTask: ITask }>());
const updateTaskSuccess = createAction(
  TaskActions.UPDATE_TASK_SUCCESS,
  props<{ updatedTask: ITask }>(),
);
const updateTaskError = createAction(TaskActions.UPDATE_TASK_ERROR, props<{ error: string }>());

const updateOrderAllTasks = createAction(
  TaskActions.UPDATE_ORDER_TASKS,
  props<{ tasks: ITask[] }>(),
);
const updateOrderAllTasksSuccess = createAction(
  TaskActions.UPDATE_ORDER_TASKS_SUCCESS,
  props<{ updatedTasks: ITask[] }>(),
);
const updateOrderAllTasksError = createAction(
  TaskActions.UPDATE_ORDER_TASKS_ERROR,
  props<{ error: string }>(),
);

const setTasks = createAction(TaskActions.SET_TASKS, props<{ tasks: ITask[]; columnId: string }>());

export {
  getTasks,
  getTasksSuccess,
  getTasksError,
  createTask,
  createTaskSuccess,
  createTaskError,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskError,
  updateTask,
  updateTaskSuccess,
  updateTaskError,
  updateOrderAllTasks,
  updateOrderAllTasksSuccess,
  updateOrderAllTasksError,
  setTasks,
};
