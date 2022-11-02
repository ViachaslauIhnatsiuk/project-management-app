import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BoardService } from '../../services/board.service';
import { getBoardsError, getBoardsSuccess } from '../actions/boards.actions';
import { BoardsActions } from '../models/boards.models';

@Injectable()
export class BoardsEffects {
  getBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.GET_BOARDS),
      mergeMap(() => {
        return this.boardService.getBoards().pipe(
          map((boards) => getBoardsSuccess({ boards })),
          catchError((error: Error) => of(getBoardsError({ error: error.message }))),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
