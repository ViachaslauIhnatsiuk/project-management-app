import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { INITIAL_EMPTY_STRING_VALUE } from 'src/app/board/constants/board.constants';

import { IBoard } from '../../models/boards.models';
import { selectUserId } from '../../store/selectors/boards.selectors';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.scss'],
})
export class CreateBoardModalComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  private userId$ = this.store.select(selectUserId);

  private userId: string | null = INITIAL_EMPTY_STRING_VALUE;

  private userIdSubscription = new Subscription();

  constructor(public dialogRef: MatDialogRef<CreateBoardModalComponent>, private store: Store) {
    this.userIdSubscription = this.userId$.subscribe((userId) => (this.userId = userId));
  }

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(INITIAL_EMPTY_STRING_VALUE, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    });
  }

  public get newBoard(): IBoard {
    return { ...this.form.value, owner: this.userId, users: [] };
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.userIdSubscription.unsubscribe();
  }
}
