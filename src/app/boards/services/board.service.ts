import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BoardApiUrls, IBoard } from '../models/boards.models';

@Injectable()
export class BoardService {
  constructor(private http: HttpClient) {}

  getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(BoardApiUrls.boards).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }
}
