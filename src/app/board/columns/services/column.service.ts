import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

import { BoardApiUrls } from '../../boards/models/boards.models';
import { IColumn } from '../models/columns.models';

@Injectable()
export class ColumnService {
  constructor(private http: HttpClient) {}

  public getColumns(boardId: string): Observable<IColumn[]> {
    return this.http
      .get<IColumn[]>(`${BoardApiUrls.boards}/${boardId}/${BoardApiUrls.columns}`)
      .pipe(
        catchError((error: Error) => {
          throw new Error(error.message);
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

  public deleteColumn(columnId: string, boardId: string): Observable<Object> {
    const params = new HttpParams().set('id', columnId);

    return this.http
      .delete(`${BoardApiUrls.boards}/${boardId}/${BoardApiUrls.columns}/${columnId}`, { params })
      .pipe(
        catchError((error: Error) => {
          throw new Error(error.message);
        }),
      );
  }

  public updateColumn({ title, _id, order }: IColumn, boardId: string): Observable<IColumn> {
    return this.http
      .put<IColumn>(`${BoardApiUrls.boards}/${boardId}/${BoardApiUrls.columns}/${_id}`, {
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
