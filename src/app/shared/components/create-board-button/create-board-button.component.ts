import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CreateBoardModalComponent } from 'src/app/board/boards/components/create-board-modal/create-board-modal.component';
import { createBoard } from 'src/app/board/boards/store/actions/boards.actions';
import { IBoard } from 'src/app/board/boards/models/boards.models';
import { DEFAULT_MODAL_SIZE } from 'src/app/board/constants/board.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-board-button',
  templateUrl: './create-board-button.component.html',
  styleUrls: ['./create-board-button.component.scss'],
})
export class CreateBoardButtonComponent {
  constructor(public dialog: MatDialog, private store: Store, public translate: TranslateService) {}

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
