import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable } from 'rxjs';
import { BoardApiUrls, IBoard } from '../models/boards.models';

@Injectable()
export class BoardService {
  private selectedForUpdateBoard: IBoard | null = null;

  constructor(private http: HttpClient, private store: Store) {}

  public getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(BoardApiUrls.boards).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }

  public createBoard(newBoard: IBoard): Observable<IBoard> {
    return this.http.post<IBoard>(BoardApiUrls.boards, newBoard).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }

  public deleteBoard(idBoard: string): Observable<Object> {
    const params = new HttpParams().set('id', idBoard);

    return this.http.delete(`${BoardApiUrls.boards}/${idBoard}`, { params }).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }

  public updateBoard({ title, description, id }: IBoard): Observable<IBoard> {
    const updatedBoard: IBoard = {
      title,
      description,
    };

    return this.http.put<IBoard>(`${BoardApiUrls.boards}/${id}`, updatedBoard).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }
}
