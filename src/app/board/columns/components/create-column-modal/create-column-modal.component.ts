import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { CreateColumnComponent } from '../create-column/create-column.component';
import { selectColumns } from '../../store/selectors/columns.selectors';
import { IColumn } from '../../models/columns.models';
import { INITIAL_EMPTY_STRING_VALUE } from 'src/app/board/constants/board.constants';

@Component({
  selector: 'app-create-column-modal',
  templateUrl: './create-column-modal.component.html',
  styleUrls: ['./create-column-modal.component.scss'],
})
export class CreateColumnModalComponent implements OnInit {
  public form!: FormGroup;

  private columns$ = this.store.select(selectColumns);

  private amountOfColumns: number = 0;

  constructor(public dialogRef: MatDialogRef<CreateColumnComponent>, private store: Store) {
    this.columns$.subscribe((columns) => (this.amountOfColumns = columns.length));
  }

  ngOnInit(): void {
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

  public get newColumn(): IColumn {
    return { ...this.form.value, order: this.amountOfColumns + 1 };
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
