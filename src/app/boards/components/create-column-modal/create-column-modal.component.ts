import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateColumnComponent } from '../create-column/create-column.component';
import { MAX_TITLE_LENGTH, MIN_TITLE_LENGTH } from '../../constants/column-item.constants';
import { INITIAL_INPUT_VALUE } from '../../constants/create-board-modal.constants';

@Component({
  selector: 'app-create-column-modal',
  templateUrl: './create-column-modal.component.html',
  styleUrls: ['./create-column-modal.component.scss'],
})
export class CreateColumnModalComponent {
  public form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateColumnComponent>) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(INITIAL_INPUT_VALUE, [
        Validators.required,
        Validators.minLength(MIN_TITLE_LENGTH),
        Validators.maxLength(MAX_TITLE_LENGTH),
      ]),
    });
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
