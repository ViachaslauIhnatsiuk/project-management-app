import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';
import {
  INITIAL_EMPTY_NUMBER_VALUE,
  INITIAL_EMPTY_STRING_VALUE,
} from '../../constants/boards.constants';
import { INITIAL_ID_BOARD_VALUE } from '../../constants/column-item.constants';
import { MIN_WIDTH_MODAL } from '../../constants/create-board-modal.constants';
import { ITask } from '../../models/boards.models';
import { createTask } from '../../store/actions/task.actions';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnDestroy {
  @Input() idColumn: string | undefined = INITIAL_EMPTY_STRING_VALUE;

  @Input() amountOfTasks: number = INITIAL_EMPTY_NUMBER_VALUE;

  private idBoardSubscription = new Subscription();

  private idActiveBoard: string = INITIAL_ID_BOARD_VALUE;

  constructor(public dialog: MatDialog, private store: Store, private route: ActivatedRoute) {
    this.idBoardSubscription = this.route.params.subscribe(
      (params) => (this.idActiveBoard = params['id']),
    );
  }

  public createTask(): void {
    const dialogRef = this.dialog.open(CreateTaskModalComponent, {
      minWidth: MIN_WIDTH_MODAL,
      data: this.amountOfTasks,
    });

    dialogRef.afterClosed().subscribe((newTask: ITask) => {
      if (newTask && this.idColumn) {
        const finalTask: ITask = {
          boardId: this.idActiveBoard,
          columnId: this.idColumn,
          order: this.amountOfTasks + 1,
          ...newTask,
        };

        this.store.dispatch(createTask({ newTask: finalTask }));
      }
    });
  }

  public ngOnDestroy(): void {
    this.idBoardSubscription.unsubscribe();
  }
}
