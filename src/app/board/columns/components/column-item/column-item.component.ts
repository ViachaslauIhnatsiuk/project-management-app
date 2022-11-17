import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import {
  DEFAULT_MODAL_SIZE,
  INITIAL_EMPTY_STRING_VALUE,
} from 'src/app/board/constants/board.constants';
import { IColumn } from '../../models/columns.models';
import { deleteColumn, updateColumn } from '../../store/actions/columns.actions';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
})
export class ColumnItemComponent implements OnDestroy, OnInit {
  @Input() public column!: IColumn;

  public form!: FormGroup;

  private idBoardSubscription = new Subscription();

  private boardId: string = INITIAL_EMPTY_STRING_VALUE;

  public isEditMode: boolean = false;

  constructor(private store: Store, public dialog: MatDialog, private route: ActivatedRoute) {
    this.idBoardSubscription = this.route.params.subscribe(
      (params) => (this.boardId = params['id']),
    );
  }

  public ngOnInit(): void {
    this.initializeForm();
  }

  public toggleEditMode(): void {
    this.initializeForm();
    this.isEditMode = !this.isEditMode;
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.column.title, [Validators.required, Validators.maxLength(30)]),
    });
  }

  public updateTitle(): void {
    const isNewTitleEquelPrevValue = this.column.title === this.form.value.title;

    if (this.form.valid && !isNewTitleEquelPrevValue) {
      const column: IColumn = { ...this.column, ...this.form.value };
      this.store.dispatch(updateColumn({ props: { column, boardId: this.boardId } }));
    }

    if (this.form.valid) {
      this.toggleEditMode();
    }
  }

  public deleteColumn(): void {
    const { _id: columnId } = this.column;

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      minWidth: DEFAULT_MODAL_SIZE,
    });

    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm && columnId)
        this.store.dispatch(deleteColumn({ props: { columnId, boardId: this.boardId } }));
    });
  }

  public ngOnDestroy(): void {
    this.idBoardSubscription.unsubscribe();
  }
}
