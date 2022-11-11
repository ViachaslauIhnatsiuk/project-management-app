import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { CreateColumnComponent } from '../create-column/create-column.component';
import { MAX_TITLE_LENGTH, MIN_TITLE_LENGTH } from '../../constants/column-item.constants';
import { INITIAL_INPUT_VALUE } from '../../constants/create-board-modal.constants';
import { selectColumns } from '../../store/selectors/boards.selectors';
import { INITIAL_EMPTY_NUMBER_VALUE } from '../../constants/boards.constants';
import { IColumn } from '../../models/boards.models';

@Component({
  selector: 'app-create-column-modal',
  templateUrl: './create-column-modal.component.html',
  styleUrls: ['./create-column-modal.component.scss'],
})
export class CreateColumnModalComponent implements OnInit {
  public form!: FormGroup;

  private columns$ = this.store.select(selectColumns);

  private amountOfColumns: number = INITIAL_EMPTY_NUMBER_VALUE;

  constructor(public dialogRef: MatDialogRef<CreateColumnComponent>, private store: Store) {
    this.columns$.subscribe((columns) => (this.amountOfColumns = columns.length));
  }

  ngOnInit(): void {
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

  public get newColumn(): IColumn {
    return { ...this.form.value, order: this.amountOfColumns + 1 };
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
