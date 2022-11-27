import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

import { BoardApiEndpoints } from '../../boards/models/boards.models';
import { IColumn } from '../models/columns.models';

@Injectable()
export class ColumnService {
  constructor(private http: HttpClient) {}

  public getColumns(boardId: string): Observable<IColumn[]> {
    return this.http
      .get<IColumn[]>(`${BoardApiEndpoints.boards}/${boardId}/${BoardApiEndpoints.columns}`)
      .pipe(
        catchError(({ message }: Error) => {
          throw new Error(message);
        }),
      );
  }

  public createColumn(boardId: string, column: IColumn): Observable<IColumn> {
    return this.http
      .post<IColumn>(`${BoardApiEndpoints.boards}/${boardId}/${BoardApiEndpoints.columns}`, column)
      .pipe(
        catchError(({ message }: Error) => {
          throw new Error(message);
        }),
      );
  }

  public deleteColumn({ _id: columnId, boardId }: IColumn): Observable<Object> {
    const params = new HttpParams().set('id', columnId as string);

    return this.http
      .delete(`${BoardApiEndpoints.boards}/${boardId}/${BoardApiEndpoints.columns}/${columnId}`, {
        params,
      })
      .pipe(
        catchError(({ message }: Error) => {
          throw new Error(message);
        }),
      );
  }

  public updateColumn({ title, _id, order, boardId }: IColumn): Observable<IColumn> {
    return this.http
      .put<IColumn>(`${BoardApiEndpoints.boards}/${boardId}/${BoardApiEndpoints.columns}/${_id}`, {
        title,
        order,
      })
      .pipe(
        catchError(({ message }: Error) => {
          throw new Error(message);
        }),
      );
  }

  public updateColumnsOrder(columns: IColumn[]): Observable<IColumn[]> {
    return this.http.patch<IColumn[]>(`${BoardApiEndpoints.columnsSet}`, columns).pipe(
      catchError(({ message }: Error) => {
        throw new Error(message);
      }),
    );
  }
}
