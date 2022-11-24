import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { BoardApiEndpoints } from '../../boards/models/boards.models';
import { ITask, ModifiedTaskForRequest } from '../models/tasks.models';
import { GetTasksProps } from '../store/models/task.models';

@Injectable()
export class TaskService {
  public searchTerm = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  public getTasks({ boardId, columnId }: GetTasksProps): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(
        `${BoardApiEndpoints.boards}/${boardId}/${BoardApiEndpoints.columns}/${columnId}/${BoardApiEndpoints.tasks}`,
      )
      .pipe(
        catchError(({ message }: Error) => {
          throw new Error(message);
        }),
      );
  }

  public getTasksByQuery(query: string): Observable<ITask[]> {
    return this.http.get<ITask[]>('tasksSet', { params: { query } }).pipe(
      catchError(({ message }: Error) => {
        throw new Error(message);
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
        `${BoardApiEndpoints.boards}/${boardId}/${BoardApiEndpoints.columns}/${columnId}/${BoardApiEndpoints.tasks}`,
        postedTask,
      )
      .pipe(
        catchError(({ message }: Error) => {
          throw new Error(message);
        }),
      );
  }

  public deleteTask({ _id, boardId, columnId }: ITask): Observable<ITask> {
    return this.http
      .delete<ITask>(
        `${BoardApiEndpoints.boards}/${boardId}/${BoardApiEndpoints.columns}/${columnId}/${BoardApiEndpoints.tasks}/${_id}`,
      )
      .pipe(
        catchError(({ message }: Error) => {
          throw new Error(message);
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
        `${BoardApiEndpoints.boards}/${boardId}/${BoardApiEndpoints.columns}/${columnId}/${BoardApiEndpoints.tasks}/${_id}`,
        updatedTask,
      )
      .pipe(
        catchError(({ message }: Error) => {
          throw new Error(message);
        }),
      );
  }

  public updateOrderAllTasks(tasks: ModifiedTaskForRequest[]): Observable<ITask[]> {
    return this.http.patch<ITask[]>(`${BoardApiEndpoints.tasksSet}`, tasks).pipe(
      catchError(({ message }: Error) => {
        throw new Error(message);
      }),
    );
  }
}
