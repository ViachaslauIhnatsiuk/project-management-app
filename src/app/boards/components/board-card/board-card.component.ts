import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { UpdateBoardModalComponent } from '../update-board-modal/update-board-modal.component';
import { deleteBoard, updateBoard } from '../../store/actions/boards.actions';
import { MIN_WIDTH_MODAL } from '../../constants/create-board-modal.constants';
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
    const { id: idBoard } = this.board;

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      minWidth: MIN_WIDTH_MODAL,
    });

    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm && idBoard) this.store.dispatch(deleteBoard({ idBoard }));
    });
  }

  public editBoard(): void {
    const { title, description, id } = this.board;

    const dialogRef = this.dialog.open(UpdateBoardModalComponent, {
      minWidth: MIN_WIDTH_MODAL,
      data: { title, description },
    });

    dialogRef.afterClosed().subscribe((updatedBoard: IBoard) => {
      if (updatedBoard) {
        const board: IBoard = { id, ...updatedBoard };
        this.store.dispatch(updateBoard({ board }));
      }
    });
  }

  public openProjectPage(): void {
    this.router.navigate([`${this.board.id}`], { relativeTo: this.route });
  }
}
