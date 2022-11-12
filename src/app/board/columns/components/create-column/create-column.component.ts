import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IColumn } from '../../models/columns.models';

import { CreateColumnModalComponent } from '../create-column-modal/create-column-modal.component';
import { createColumn } from '../../store/actions/columns.actions';
import { DEFAULT_MODAL_SIZE } from 'src/app/board/constants/board.constants';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss'],
})
export class CreateColumnComponent implements OnDestroy {
  private idBoardSubscription = new Subscription();

  private idActiveBoard: string = '';

  constructor(public dialog: MatDialog, private store: Store, private route: ActivatedRoute) {
    this.idBoardSubscription = this.route.params.subscribe(
      (params) => (this.idActiveBoard = params['id']),
    );
  }

  public createColumn(): void {
    const dialogRef = this.dialog.open(CreateColumnModalComponent, {
      minWidth: DEFAULT_MODAL_SIZE,
    });

    dialogRef.afterClosed().subscribe((newColumn: IColumn) => {
      if (newColumn) {
        this.store.dispatch(createColumn({ props: { boardId: this.idActiveBoard, newColumn } }));
      }
    });
  }

  public ngOnDestroy(): void {
    this.idBoardSubscription.unsubscribe();
  }
}
