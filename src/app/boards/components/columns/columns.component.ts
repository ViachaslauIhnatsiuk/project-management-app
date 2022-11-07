import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { INITIAL_ID_BOARD_VALUE } from '../../constants/column-item.constants';
import { IColumn } from '../../models/boards.models';
import { getBoardById } from '../../store/actions/boards.actions';
import { setColumns, updateColumn } from '../../store/actions/column.actions';
import { selectColumns } from '../../store/selectors/boards.selectors';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})
export class ColumnsComponent implements OnInit, OnDestroy {
  private idBoardSubscription = new Subscription();

  private idActiveBoard: string = INITIAL_ID_BOARD_VALUE;

  private columns$ = this.store.select(selectColumns);

  private columnsSubscription = new Subscription();

  public columns: IColumn[] = [];

  constructor(private route: ActivatedRoute, private store: Store) {
    this.idBoardSubscription = this.route.params.subscribe(
      (params) => (this.idActiveBoard = params['id']),
    );
    this.columns$.subscribe((columns) => (this.columns = [...columns]));
  }

  public ngOnInit(): void {
    if (this.idActiveBoard) {
      this.store.dispatch(getBoardById({ idBoard: this.idActiveBoard }));
    }
  }

  public dropColumn({
    container: { data: columns },
    currentIndex,
    previousIndex,
  }: CdkDragDrop<IColumn[], any, any>): void {
    if (currentIndex === previousIndex) return;

    moveItemInArray(columns, previousIndex, currentIndex);

    const newOrder = currentIndex + 1;
    let movedColumn: IColumn = { ...columns[currentIndex], order: newOrder };

    this.store.dispatch(
      updateColumn({ props: { column: movedColumn, idBoard: this.idActiveBoard } }),
    );

    this.updateColumnsInStore(columns);
  }

  private updateColumnsInStore(columns: IColumn[]): void {
    this.store.dispatch(setColumns({ columns }));
  }

  public ngOnDestroy(): void {
    this.idBoardSubscription.unsubscribe();
    this.columnsSubscription.unsubscribe();
  }
}
