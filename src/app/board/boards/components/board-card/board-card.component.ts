import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { UpdateBoardModalComponent } from '../update-board-modal/update-board-modal.component';
import { deleteBoard, updateBoard } from '../../store/actions/boards.actions';
import { DEFAULT_MODAL_SIZE } from 'src/app/board/constants/board.constants';
import { IBoard } from '../../models/boards.models';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() board!: IBoard;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public deleteBoard(): void {
    const { _id: boardId } = this.board;

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      minWidth: DEFAULT_MODAL_SIZE,
    });

    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm && boardId) this.store.dispatch(deleteBoard({ boardId }));
    });
  }

  public editBoard(): void {
    const { title, _id: boardId } = this.board;

    const dialogRef = this.dialog.open(UpdateBoardModalComponent, {
      minWidth: DEFAULT_MODAL_SIZE,
      data: { title },
    });

    dialogRef.afterClosed().subscribe((updatedBoard: IBoard) => {
      if (updatedBoard) {
        const board: IBoard = { ...updatedBoard, _id: boardId };
        this.store.dispatch(updateBoard({ board }));
      }
    });
  }

  public openProjectPage(): void {
    this.router.navigate([`${this.board._id}`], { relativeTo: this.route });
  }
}
