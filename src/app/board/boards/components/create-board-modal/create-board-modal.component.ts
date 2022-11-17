import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { INITIAL_EMPTY_STRING_VALUE } from 'src/app/board/constants/board.constants';
import { selectUser } from 'src/app/users/store/selectors/users.selectors';

import { IBoard } from '../../models/boards.models';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.scss'],
})
export class CreateBoardModalComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  private user$ = this.store.select(selectUser);

  private userId: string | null = INITIAL_EMPTY_STRING_VALUE;

  private userIdSubscription = new Subscription();

  constructor(public dialogRef: MatDialogRef<CreateBoardModalComponent>, private store: Store) {}

  public ngOnInit(): void {
    this.initializeForm();

    this.userIdSubscription = this.user$.subscribe((user) => {
      if (user) {
        this.form.get('owner')?.setValue(user._id);
      }
    });
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(INITIAL_EMPTY_STRING_VALUE, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      owner: new FormControl(''),
      users: new FormControl<string[]>([]),
    });
  }

  public get newBoard(): IBoard {
    return this.form.value;
  }

  public onBoardUsersChange(userIdList: string[] | null): void {
    if (userIdList) this.form.get('users')?.setValue(userIdList);
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.userIdSubscription.unsubscribe();
  }
}
