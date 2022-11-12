import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { CreateBoardModalComponent } from '../create-board-modal/create-board-modal.component';
import { createBoard } from '../../store/actions/boards.actions';
import { IBoard } from '../../models/boards.models';
import { DEFAULT_MODAL_SIZE } from 'src/app/board/constants/board.constants';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent {
  constructor(public dialog: MatDialog, private store: Store) {}

  public createBoard(): void {
    const dialogRef = this.dialog.open(CreateBoardModalComponent, {
      minWidth: DEFAULT_MODAL_SIZE,
    });

    dialogRef.afterClosed().subscribe((newBoard: IBoard) => {
      if (newBoard) {
        this.store.dispatch(createBoard({ newBoard }));
      }
    });
  }
}
