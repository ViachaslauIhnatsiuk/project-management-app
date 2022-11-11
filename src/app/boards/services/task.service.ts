import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BoardApiUrls, ITask } from '../models/boards.models';
import { DeleteTaskProps, GetTasksProps } from '../store/models/task.models';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {}

  public getTasks({ boardId, columnId }: GetTasksProps): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(
        `${BoardApiUrls.boards}/${boardId}/${BoardApiUrls.columns}/${columnId}/${BoardApiUrls.tasks}`,
      )
      .pipe(
        catchError((error: Error) => {
          throw new Error(error.message);
        }),
      );
  }

  public createTask(task: ITask): Observable<ITask> {
    const { boardId, columnId, title, description, userId, users, order } = task;
    const postedTask = {
      title,
      description,
      userId,
      users,
      order,
    };

    return this.http
      .post<ITask>(
        `${BoardApiUrls.boards}/${boardId}/${BoardApiUrls.columns}/${columnId}/${BoardApiUrls.tasks}`,
        postedTask,
      )
      .pipe(
        catchError((error: Error) => {
          throw new Error(error.message);
        }),
      );
  }

  public deleteTask({ boardId, columnId, idTask }: DeleteTaskProps): Observable<Object> {
    const params = new HttpParams().set('id', idTask);

    return this.http
      .delete(
        `${BoardApiUrls.boards}/${boardId}/${BoardApiUrls.columns}/${columnId}/${BoardApiUrls.tasks}/${idTask}`,
        {
          params,
        },
      )
      .pipe(
        catchError((error: Error) => {
          throw new Error(error.message);
        }),
      );
  }

  public updateTask({
    description,
    title,
    userId,
    boardId,
    columnId,
    _id,
    order,
    users,
  }: ITask): Observable<ITask> {
    const updatedTask: ITask = { description, title, userId, columnId, order, users };

    return this.http
      .put<ITask>(
        `${BoardApiUrls.boards}/${boardId}/${BoardApiUrls.columns}/${columnId}/${BoardApiUrls.tasks}/${_id}`,
        updatedTask,
      )
      .pipe(
        catchError((error: Error) => {
          throw new Error(error.message);
        }),
      );
  }

  public updateOrderAllTasks(tasks: ITask[]): Observable<ITask[]> {
    return this.http.patch<ITask[]>(`${BoardApiUrls.tasksSet}`, tasks).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }
}
