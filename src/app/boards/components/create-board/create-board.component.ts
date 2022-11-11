import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { CreateBoardModalComponent } from '../create-board-modal/create-board-modal.component';
import { MIN_WIDTH_MODAL } from '../../constants/create-board-modal.constants';
import { createBoard } from '../../store/actions/boards.actions';
import { IBoard } from '../../models/boards.models';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent {
  constructor(public dialog: MatDialog, private store: Store) {}

  public createBoard(): void {
    const dialogRef = this.dialog.open(CreateBoardModalComponent, {
      minWidth: MIN_WIDTH_MODAL,
    });

    dialogRef.afterClosed().subscribe((newBoard: IBoard) => {
      if (newBoard) {
        this.store.dispatch(createBoard({ newBoard }));
      }
    });
  }
}
