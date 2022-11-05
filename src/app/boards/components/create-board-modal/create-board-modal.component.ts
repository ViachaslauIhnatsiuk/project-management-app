import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  INITIAL_INPUT_VALUE,
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_INPUT_VALUE_LENGTH,
} from '../../constants/create-board-modal.constants';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.scss'],
})
export class CreateBoardModalComponent {
  public form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateBoardModalComponent>) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(INITIAL_INPUT_VALUE, [
        Validators.required,
        Validators.minLength(MIN_INPUT_VALUE_LENGTH),
        Validators.maxLength(MAX_TITLE_LENGTH),
      ]),
      description: new FormControl(INITIAL_INPUT_VALUE, [
        Validators.required,
        Validators.minLength(MIN_INPUT_VALUE_LENGTH),
        Validators.maxLength(MAX_DESCRIPTION_LENGTH),
      ]),
    });
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
