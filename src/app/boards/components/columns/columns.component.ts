import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { INITIAL_ID_BOARD_VALUE } from '../../constants/column-item.constants';
import { IColumn } from '../../models/boards.models';
import {
  getColumns,
  resetColumns,
  setColumns,
  updateOrderAllColumns,
} from '../../store/actions/column.actions';
import { selectColumns } from '../../store/selectors/boards.selectors';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})
export class ColumnsComponent implements OnInit, OnDestroy {
  private columns$ = this.store.select(selectColumns);

  public columns: IColumn[] = [];

  private idBoardSubscription = new Subscription();

  private columnsSubscription = new Subscription();

  private idActiveBoard: string = INITIAL_ID_BOARD_VALUE;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.idBoardSubscription = this.route.params.subscribe(
      (params) => (this.idActiveBoard = params['id']),
    );
    this.columnsSubscription = this.columns$.subscribe((columns) => {
      this.columns = [...columns];
    });
  }

  public ngOnInit(): void {
    if (this.idActiveBoard) {
      this.store.dispatch(getColumns({ boardId: this.idActiveBoard }));
    }
  }

  public dropColumn({
    container: { data: columns },
    currentIndex,
    previousIndex,
  }: CdkDragDrop<IColumn[], any, any>): void {
    if (currentIndex === previousIndex) return;

    moveItemInArray(columns, previousIndex, currentIndex);

    const sortedByOrderColumns = columns.map((column, index) => {
      const updatedColumn = { ...column };
      updatedColumn.order = index + 1;
      return updatedColumn;
    });

    this.store.dispatch(setColumns({ columns: sortedByOrderColumns }));

    const modifiedColumnsForRequest = sortedByOrderColumns.map(({ _id, order }) => {
      return { _id, order };
    });

    this.store.dispatch(updateOrderAllColumns({ columns: modifiedColumnsForRequest }));
  }

  public ngOnDestroy(): void {
    this.idBoardSubscription.unsubscribe();
    this.columnsSubscription.unsubscribe();
    this.store.dispatch(resetColumns());
  }
}
