import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BoardService } from '../../services/board.service';
import {
  createBoardError,
  createBoardSuccess,
  deleteBoardError,
  deleteBoardSuccess,
  getBoardsError,
  getBoardsSuccess,
  updateBoardError,
  updateBoardSuccess,
} from '../actions/boards.actions';
import { BoardsActions } from '../models/boards.models';
import { IBoard } from '../../models/boards.models';

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

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.DELETE_BOARD),
      mergeMap(({ idBoard }: { idBoard: string }) => {
        return this.boardService.deleteBoard(idBoard).pipe(
          map(() => deleteBoardSuccess({ idBoard })),
          catchError((error: Error) => of(deleteBoardError({ error: error.message }))),
        );
      }),
    );
  });

  updateBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.UPDATE_BOARD),
      mergeMap(({ board }: { board: IBoard }) => {
        return this.boardService.updateBoard(board).pipe(
          map((updatedBoard) => updateBoardSuccess({ updatedBoard })),
          catchError((error: Error) => of(updateBoardError({ error: error.message }))),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
