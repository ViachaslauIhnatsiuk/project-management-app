import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BoardApiEndpoints, IBoard } from '../models/boards.models';

@Injectable()
export class BoardService {
  constructor(private http: HttpClient) {}

  public getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(BoardApiEndpoints.boards).pipe(
      catchError(({ message }: Error) => {
        throw new Error(message);
      }),
    );
  }

  public getBoardById(boardId: string): Observable<IBoard> {
    return this.http.get<IBoard>(`${BoardApiEndpoints.boards}/${boardId}`).pipe(
      catchError(({ message }: Error) => {
        throw new Error(message);
      }),
    );
  }

  public getBoardsByUserId(userId: string): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${BoardApiEndpoints.boardsSet}/${userId}`).pipe(
      catchError(({ message }: Error) => {
        throw new Error(message);
      }),
    );
  }

  public createBoard(newBoard: IBoard): Observable<IBoard> {
    return this.http.post<IBoard>(BoardApiEndpoints.boards, newBoard).pipe(
      catchError(({ message }: Error) => {
        throw new Error(message);
      }),
    );
  }

  public deleteBoard(boardId: string): Observable<Object> {
    return this.http.delete(`${BoardApiEndpoints.boards}/${boardId}`).pipe(
      catchError(({ message }: Error) => {
        throw new Error(message);
      }),
    );
  }

  public updateBoard({ title, _id, owner, users }: IBoard): Observable<IBoard> {
    const updatedBoard: IBoard = {
      title,
      owner,
      users,
    };

    return this.http.put<IBoard>(`${BoardApiEndpoints.boards}/${_id}`, updatedBoard).pipe(
      catchError(({ message }: Error) => {
        throw new Error(message);
      }),
    );
  }
}
