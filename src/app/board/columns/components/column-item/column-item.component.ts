import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { DEFAULT_MODAL_SIZE } from 'src/app/board/constants/board.constants';
import { IColumn } from '../../models/columns.models';
import { deleteColumn, updateColumn } from '../../store/actions/columns.actions';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
})
export class ColumnItemComponent implements OnInit {
  @Input() public set column(column: IColumn) {
    this.currentColumn = { ...column };
  }
  public currentColumn!: IColumn;

  public form!: FormGroup;
  public isEditMode: boolean = false;

  constructor(private store: Store, public dialog: MatDialog) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.currentColumn.title, [
        Validators.required,
        Validators.maxLength(20),
      ]),
    });
  }

  public updateTitle(): void {
    const isNewTitleEquelPrevValue = this.currentColumn.title === this.form.value.title;

    if (this.form.valid && !isNewTitleEquelPrevValue) {
      this.currentColumn.title = this.form.value.title;
      const updatedColumn: IColumn = { ...this.currentColumn, ...this.form.value };

      this.store.dispatch(updateColumn({ updatedColumn }));
    }

    if (this.form.valid) {
      this.toggleEditMode();
    }
  }

  public deleteColumn(): void {
    const { _id: columnId } = this.currentColumn;

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      minWidth: DEFAULT_MODAL_SIZE,
    });

    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm && columnId)
        this.store.dispatch(deleteColumn({ deletedColumn: this.currentColumn }));
    });
  }

  public toggleEditMode(): void {
    this.initializeForm();
    this.isEditMode = !this.isEditMode;
  }
}
