import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MAX_TITLE_LENGTH,
  MIN_INPUT_VALUE_LENGTH,
} from '../../constants/create-board-modal.constants';
import { getUserId } from '../../helpers/boards.helpers';
import { IBoard } from '../../models/boards.models';

@Component({
  selector: 'app-update-board-modal',
  templateUrl: './update-board-modal.component.html',
  styleUrls: ['./update-board-modal.component.scss'],
})
export class UpdateBoardModalComponent {
  public form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateBoardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBoard,
  ) {
    this.initializeForm(data);
  }

  private initializeForm(board: IBoard): void {
    this.form = new FormGroup({
      title: new FormControl(board.title, [
        Validators.required,
        Validators.minLength(MIN_INPUT_VALUE_LENGTH),
        Validators.maxLength(MAX_TITLE_LENGTH),
      ]),
    });
  }

  get updatedBoard(): IBoard {
    return <IBoard>{ ...this.form.value, users: [], owner: getUserId() };
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
