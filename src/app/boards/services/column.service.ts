import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BoardApiUrls, IColumn } from '../models/boards.models';

@Injectable()
export class ColumnService {
  constructor(private http: HttpClient) {}

  public getColumns(idBoard: string): Observable<IColumn[]> {
    return this.http.get<IColumn[]>(`/${idBoard}/${BoardApiUrls.columns}`).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }

  public createColumn(idBoard: string, column: IColumn): Observable<IColumn> {
    return this.http.post<IColumn>(`/${idBoard}/${BoardApiUrls.columns}`, column).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }

  public deleteColumn(idColumn: string, idBoard: string): Observable<Object> {
    const params = new HttpParams().set('id', idColumn);

    return this.http.delete(`/${idBoard}/${BoardApiUrls.columns}/${idColumn}`, { params }).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }

  public updateColumn({ title, id, order }: IColumn, idBoard: string): Observable<IColumn> {
    return this.http
      .put<IColumn>(`/${idBoard}/${BoardApiUrls.columns}/${id}`, {
        title,
        order,
      })
      .pipe(
        catchError((error: Error) => {
          throw new Error(error.message);
        }),
      );
  }
}
