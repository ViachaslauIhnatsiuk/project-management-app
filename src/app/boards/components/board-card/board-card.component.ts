import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IBoard } from '../../models/boards.models';
import { BoardModalService } from '../../services/board-modal.service';
import { deleteBoard, setUpdatedBoard } from '../../store/actions/boards.actions';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() board!: IBoard;

  constructor(
    private boardModalService: BoardModalService,
    private store: Store,
    public dialog: MatDialog,
  ) {}

  public deleteBoard(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm && this.board.id) this.store.dispatch(deleteBoard({ idBoard: this.board.id }));
    });
  }

  public editBoard(): void {
    if (this.board.id) {
      this.boardModalService.openUpdateBoardModal();
      this.store.dispatch(setUpdatedBoard({ board: this.board }));
    }
  }
}
