import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectActiveBoard } from 'src/app/board/boards/store/selectors/boards.selectors';
import { PointCreate } from '../../models/points.models';
import { createPoint } from '../../store/actions/points.actions';

@Component({
  selector: 'app-point-form',
  templateUrl: './point-form.component.html',
  styleUrls: ['./point-form.component.scss'],
})
export class PointFormComponent {
  @Input() taskId: string = '';

  private activeBoard$ = this.store.select(selectActiveBoard);

  private boardId: string = '';

  public pointTitle: string = '';

  constructor(private store: Store) {
    this.activeBoard$.subscribe((board) => {
      if (board && board._id) {
        this.boardId = board._id;
      }
    });
  }

  public createPoint(): void {
    const newPoint: PointCreate = {
      boardId: this.boardId,
      taskId: this.taskId,
      title: this.pointTitle,
      done: false,
    };

    this.store.dispatch(createPoint({ newPoint }));

    this.clearPointTitle();
  }

  public clearPointTitle(): void {
    this.pointTitle = '';
  }
}
