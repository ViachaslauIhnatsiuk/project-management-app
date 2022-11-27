import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private columnsSubscription = new Subscription();
  public columns: IColumn[] = [];

  private boardIdSubscription = new Subscription();
  private boardId: string = INITIAL_EMPTY_STRING_VALUE;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {
    this.getBoardId();
    this.getColumns();

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  public ngOnInit(): void {
    this.store.dispatch(getColumns({ boardId: this.boardId }));
  }

  private getBoardId(): void {
    this.boardIdSubscription = this.route.params.subscribe(
      (params) => (this.boardId = params['id']),
    );
  }

  private getColumns(): void {
    this.columnsSubscription = this.columns$.subscribe((columns) => {
      this.columns = [...columns];
    });
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
    this.boardIdSubscription.unsubscribe();
    this.columnsSubscription.unsubscribe();
    this.store.dispatch(resetColumns());
  }
}
