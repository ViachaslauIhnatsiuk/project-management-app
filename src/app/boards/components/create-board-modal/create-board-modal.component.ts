import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import {
  INITIAL_INPUT_VALUE,
  MAX_TITLE_LENGTH,
  MIN_INPUT_VALUE_LENGTH,
} from '../../constants/create-board-modal.constants';
import { INITIAL_EMPTY_STRING_VALUE } from '../../constants/boards.constants';
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
      title: new FormControl(INITIAL_INPUT_VALUE, [
        Validators.required,
        Validators.minLength(MIN_INPUT_VALUE_LENGTH),
        Validators.maxLength(MAX_TITLE_LENGTH),
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
