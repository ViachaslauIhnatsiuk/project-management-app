import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, switchMap, of } from 'rxjs';
import { BoardApiUrls, IColumn } from '../models/boards.models';
import { TaskService } from './task.service';

@Injectable()
export class ColumnService {
  constructor(private http: HttpClient, private tasksService: TaskService) {}

  public getColumns(boardId: string): Observable<IColumn[]> {
    return this.http
      .get<IColumn[]>(`${BoardApiUrls.boards}/${boardId}/${BoardApiUrls.columns}`)
      .pipe(
        switchMap((columns) => {
          if (!columns.length) return of(columns);
          return forkJoin(
            columns.map((column) => {
              return this.tasksService.getTasks({ boardId, columnId: column._id! }).pipe(
                map((tasks) => {
                  column.tasks = tasks.sort((a, b) => a.order! - b.order!);
                  return column;
                }),
              );
            }),
          );
        }),
      );
  }

  public createColumn(boardId: string, column: IColumn): Observable<IColumn> {
    return this.http
      .post<IColumn>(`${BoardApiUrls.boards}/${boardId}/${BoardApiUrls.columns}`, column)
      .pipe(
        catchError((error: Error) => {
          throw new Error(error.message);
        }),
      );
  }

  public deleteColumn(idColumn: string, idBoard: string): Observable<Object> {
    const params = new HttpParams().set('id', idColumn);

    return this.http
      .delete(`${BoardApiUrls.boards}/${idBoard}/${BoardApiUrls.columns}/${idColumn}`, { params })
      .pipe(
        catchError((error: Error) => {
          throw new Error(error.message);
        }),
      );
  }

  public updateColumn({ title, _id, order }: IColumn, idBoard: string): Observable<IColumn> {
    return this.http
      .put<IColumn>(`${BoardApiUrls.boards}/${idBoard}/${BoardApiUrls.columns}/${_id}`, {
        title,
        order,
      })
      .pipe(
        catchError((error: Error) => {
          throw new Error(error.message);
        }),
      );
  }

  public updateOrderAllColumns(columns: IColumn[]): Observable<IColumn[]> {
    return this.http.patch<IColumn[]>(`${BoardApiUrls.columnsSet}`, columns).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }
}
