import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { IBoard } from '../../models/boards.models';
import { BoardService } from '../../services/board.service';
import {
  createBoardError,
  createBoardSuccess,
  getBoardsError,
  getBoardsSuccess,
} from '../actions/boards.actions';
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

  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.CREATE_BOARD),
      mergeMap(({ newBoard }: { newBoard: IBoard }) => {
        return this.boardService.createBoard(newBoard).pipe(
          map((board) => createBoardSuccess({ newBoard: board })),
          catchError((error: Error) => of(createBoardError({ error: error.message }))),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
