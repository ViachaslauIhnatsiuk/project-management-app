import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BoardModalService } from '../../services/board-modal.service';
import { updateBoard } from '../../store/actions/boards.actions';
import { selectUpdatedBoard } from '../../store/selectors/boards.selectors';

@Component({
  selector: 'app-update-board-modal',
  templateUrl: './update-board-modal.component.html',
  styleUrls: ['./update-board-modal.component.scss'],
})
export class UpdateBoardModalComponent implements OnDestroy {
  public form!: FormGroup;

  private selectedForUpdateBoard$ = this.store.select(selectUpdatedBoard);

  private updatedBoardSubscription: Subscription = new Subscription();

  constructor(public boardModalService: BoardModalService, private store: Store) {
    this.initializeForm();
    this.subscribeToUpdatedBoard();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(8)]),
      description: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  public updateBoard(): void {
    if (this.form.status === 'VALID') {
      const updatedBoard = this.form.value;
      this.store.dispatch(updateBoard({ updatedBoard }));

      this.boardModalService.closeUpdateBoardModal();
      this.form.reset();
    }
  }

  private subscribeToUpdatedBoard(): void {
    this.updatedBoardSubscription = this.selectedForUpdateBoard$.subscribe((updatedBoard) => {
      if (updatedBoard) {
        this.form.get('title')?.setValue(updatedBoard.title);
        this.form.get('description')?.setValue(updatedBoard.description);
      }
    });
  }

  public ngOnDestroy(): void {
    this.updatedBoardSubscription.unsubscribe();
  }
}
