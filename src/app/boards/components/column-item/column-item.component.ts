import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { INITIAL_ID_BOARD_VALUE } from '../../constants/column-item.constants';
import { IColumn } from '../../models/boards.models';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
})
export class ColumnItemComponent implements OnDestroy {
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

  public toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  ngOnDestroy(): void {
    this.idBoardSubscription.unsubscribe();
  }
}
