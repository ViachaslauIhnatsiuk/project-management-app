import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BoardApiUrls, IBoard } from '../models/boards.models';

@Injectable()
export class BoardService {
  public isCreateBoardModalVisible = false;

  constructor(private http: HttpClient) {}

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

  public openCreateBoardModal(): void {
    this.isCreateBoardModalVisible = true;
  }

  public closeCreateBoardModal(): void {
    this.isCreateBoardModalVisible = false;
  }
}
