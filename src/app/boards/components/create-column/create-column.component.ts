import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { INITIAL_ID_BOARD_VALUE, MIN_WIDTH_MODAL } from '../../constants/column-item.constants';
import { IColumn } from '../../models/boards.models';
import { createColumn } from '../../store/actions/column.actions';
import { CreateColumnModalComponent } from '../create-column-modal/create-column-modal.component';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss'],
})
export class CreateColumnComponent implements OnDestroy {
  private idBoardSub = new Subscription();

  private idActiveBoard: string = INITIAL_ID_BOARD_VALUE;

  constructor(public dialog: MatDialog, private store: Store, private route: ActivatedRoute) {
    this.idBoardSub = this.route.params.subscribe((params) => (this.idActiveBoard = params['id']));
  }

  public createColumn(): void {
    const dialogRef = this.dialog.open(CreateColumnModalComponent, {
      minWidth: MIN_WIDTH_MODAL,
    });

    dialogRef.afterClosed().subscribe((newColumn: IColumn) => {
      if (newColumn) {
        this.store.dispatch(createColumn({ props: { idBoard: this.idActiveBoard, newColumn } }));
      }
    });
  }

  public ngOnDestroy(): void {
    this.idBoardSub.unsubscribe();
  }
}
