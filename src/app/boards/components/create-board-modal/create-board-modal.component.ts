import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BoardService } from '../../services/board.service';
import { createBoard } from '../../store/actions/boards.actions';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.scss'],
})
export class CreateBoardModalComponent {
  public form: FormGroup;

  constructor(public boardService: BoardService, private store: Store) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(8)]),
      description: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  public createNewBoard(): void {
    if (this.form.status === 'VALID') {
      const newBoard = this.form.value;
      this.store.dispatch(createBoard({ newBoard }));

      this.boardService.closeCreateBoardModal();
      this.form.reset();
    }
  }
}
