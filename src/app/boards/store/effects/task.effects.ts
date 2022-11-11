import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ITask } from '../../models/boards.models';
import { TaskService } from '../../services/task.service';
import {
  createTaskError,
  createTaskSuccess,
  deleteTaskError,
  deleteTaskSuccess,
  getTasksError,
  getTasksSuccess,
  updateOrderAllTasksError,
  updateOrderAllTasksSuccess,
  updateTaskError,
  updateTaskSuccess,
} from '../actions/task.actions';
import { TaskActions, DeleteTaskProps, GetTasksProps } from '../models/task.models';

@Injectable()
export class TaskEffects {
  getTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.GET_TASKS),
      mergeMap(({ props }: { props: GetTasksProps }) => {
        return this.taskService.getTasks(props).pipe(
          map((tasks) => getTasksSuccess({ tasks, columnId: props.columnId })),
          catchError((error: Error) => of(getTasksError({ error: error.message }))),
        );
      }),
    );
  });

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.CREATE_TASK),
      mergeMap(({ newTask }: { newTask: ITask }) => {
        return this.taskService.createTask(newTask).pipe(
          map((task) => createTaskSuccess({ newTask: task })),
          catchError((error: Error) => of(createTaskError({ error: error.message }))),
        );
      }),
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.DELETE_TASK),
      mergeMap(({ props: { boardId, idTask, columnId } }: { props: DeleteTaskProps }) => {
        return this.taskService.deleteTask({ idTask, columnId, boardId }).pipe(
          map(() => deleteTaskSuccess({ idTask, columnId })),
          catchError((error: Error) => of(deleteTaskError({ error: error.message }))),
        );
      }),
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.UPDATE_TASK),
      mergeMap(({ updatedTask }: { updatedTask: ITask }) => {
        return this.taskService.updateTask(updatedTask).pipe(
          map((task) => updateTaskSuccess({ updatedTask: task })),
          catchError((error: Error) => of(updateTaskError({ error: error.message }))),
        );
      }),
    );
  });

  updateOrderAllTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.UPDATE_ORDER_TASKS),
      mergeMap(({ tasks }: { tasks: ITask[] }) => {
        return this.taskService.updateOrderAllTasks(tasks).pipe(
          map((updatedTasks) => updateOrderAllTasksSuccess({ updatedTasks })),
          catchError((error: Error) => of(updateOrderAllTasksError({ error: error.message }))),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
