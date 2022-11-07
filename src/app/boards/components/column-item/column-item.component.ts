import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { deleteColumn, updateColumn } from '../../store/actions/column.actions';
import { IColumn } from '../../models/boards.models';
import {
  INITIAL_ID_BOARD_VALUE,
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
  MIN_WIDTH_MODAL,
} from '../../constants/column-item.constants';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
})
export class ColumnItemComponent implements OnDestroy, OnInit {
  @Input() public column!: IColumn;

  public form!: FormGroup;

  private idBoardSubscription = new Subscription();

  private idBoard: string = INITIAL_ID_BOARD_VALUE;

  public isEditMode: boolean = false;

  constructor(private store: Store, public dialog: MatDialog, private route: ActivatedRoute) {
    this.idBoardSubscription = this.route.params.subscribe(
      (params) => (this.idBoard = params['id']),
    );
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  public toggleEditMode(): void {
    this.initializeForm();
    this.isEditMode = !this.isEditMode;
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.column.title, [
        Validators.required,
        Validators.minLength(MIN_TITLE_LENGTH),
        Validators.maxLength(MAX_TITLE_LENGTH),
      ]),
    });
  }

  public updateTitle(): void {
    const isNewTitleEquelPrevValue = this.column.title === this.form.value.title;

    if (this.form.valid && !isNewTitleEquelPrevValue) {
      const column: IColumn = { ...this.column, ...this.form.value };
      this.store.dispatch(updateColumn({ props: { column, idBoard: this.idBoard } }));
    }

    if (this.form.valid) {
      this.toggleEditMode();
    }
  }

  public deleteColumn(): void {
    const { id: idColumn } = this.column;

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      minWidth: MIN_WIDTH_MODAL,
    });

    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm && idColumn)
        this.store.dispatch(deleteColumn({ props: { idColumn, idBoard: this.idBoard } }));
    });
  }

  ngOnDestroy(): void {
    this.idBoardSubscription.unsubscribe();
  }
}
