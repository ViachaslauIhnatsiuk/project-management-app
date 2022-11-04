import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, Subscription } from 'rxjs';
import { BoardApiUrls, IBoard } from '../models/boards.models';
import { selectUpdatedBoard } from '../store/selectors/boards.selectors';

@Injectable()
export class BoardService implements OnDestroy {
  private selectedForUpdateBoard: IBoard | null = null;

  private selectedForUpdateBoard$ = this.store.select(selectUpdatedBoard);

  private updatedBoardSubscription = new Subscription();

  constructor(private http: HttpClient, private store: Store) {
    this.subscribeToUpdatedBoard();
  }

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

  public updateBoard(updatedBoard: IBoard): Observable<IBoard> {
    return this.http
      .put<IBoard>(`${BoardApiUrls.boards}/${this.selectedForUpdateBoard?.id}`, updatedBoard)
      .pipe(
        catchError((error: Error) => {
          throw new Error(error.message);
        }),
      );
  }

  private subscribeToUpdatedBoard(): void {
    this.updatedBoardSubscription = this.selectedForUpdateBoard$.subscribe(
      (updatedBoard) => (this.selectedForUpdateBoard = updatedBoard),
    );
  }

  public ngOnDestroy(): void {
    this.updatedBoardSubscription.unsubscribe();
  }
}
