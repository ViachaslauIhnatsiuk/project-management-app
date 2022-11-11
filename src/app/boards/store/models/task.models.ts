import { ITask } from '../../models/boards.models';

enum TaskActions {
  GET_TASKS = '[Project Page] Get Tasks',
  GET_TASKS_SUCCESS = '[Project Page] Get Tasks success',
  GET_TASKS_ERROR = '[Project Page] Get Tasks error',
  CREATE_TASK = '[Project Page] Create Task',
  CREATE_TASK_SUCCESS = '[Project Page] Create Task success',
  CREATE_TASK_ERROR = '[Project Page] Create Task error',
  DELETE_TASK = '[Project Page] Delete Task',
  DELETE_TASK_SUCCESS = '[Project Page] Delete Task success',
  DELETE_TASK_ERROR = '[Project Page] Delete Task error',
  UPDATE_TASK = '[Project Page] Update Task',
  UPDATE_TASK_SUCCESS = '[Project Page] Update Task success',
  UPDATE_TASK_ERROR = '[Project Page] Update Task error',
  UPDATE_ORDER_TASKS = '[Project Page] Update Order Tasks',
  UPDATE_ORDER_TASKS_SUCCESS = '[Project Page] Update Order Tasks success',
  UPDATE_ORDER_TASKS_ERROR = '[Project Page] Update Order Tasks error',
  SET_TASKS = '[Project Page] Set Tasks',
}

type GetTasksProps = {
  boardId: string;
  columnId: string;
};

type CreateTaskProps = GetTasksProps & {
  newTask: ITask;
};

type DeleteTaskProps = GetTasksProps & {
  idTask: string;
};

type UpdateTaskProps = GetTasksProps & {
  column: ITask;
};

export type { CreateTaskProps, DeleteTaskProps, UpdateTaskProps, GetTasksProps };
export { TaskActions };
