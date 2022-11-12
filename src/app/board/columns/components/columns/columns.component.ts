import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { INITIAL_EMPTY_STRING_VALUE } from 'src/app/board/constants/board.constants';
import { IColumn } from '../../models/columns.models';
import { getColumns, resetColumns, updateColumnsOrder } from '../../store/actions/columns.actions';
import { selectColumns } from '../../store/selectors/columns.selectors';

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

  private idActiveBoard: string = INITIAL_EMPTY_STRING_VALUE;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.idBoardSubscription = this.route.params.subscribe(
      (params) => (this.idActiveBoard = params['id']),
    );
    this.columnsSubscription = this.columns$.subscribe((columns) => {
      this.columns = [...columns];
    });
  }

  public ngOnInit(): void {
    this.store.dispatch(getColumns({ boardId: this.idActiveBoard }));
  }

  public dropColumn({
    container: { data: columns },
    currentIndex,
    previousIndex,
  }: CdkDragDrop<IColumn[], any, any>): void {
    if (currentIndex === previousIndex) return;

    moveItemInArray(columns, previousIndex, currentIndex);

    const modifiedColumnsForRequest = columns.map(({ _id }, index) => ({ _id, order: index + 1 }));

    this.store.dispatch(updateColumnsOrder({ columns: modifiedColumnsForRequest }));
  }

  public ngOnDestroy(): void {
    this.idBoardSubscription.unsubscribe();
    this.columnsSubscription.unsubscribe();
    this.store.dispatch(resetColumns());
  }
}
