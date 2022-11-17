import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';
import { createTask } from '../../store/actions/task.actions';
import { ITask } from '../../models/tasks.models';
import {
  DEFAULT_MODAL_SIZE,
  INITIAL_EMPTY_NUMBER_VALUE,
  INITIAL_EMPTY_STRING_VALUE,
} from 'src/app/board/constants/board.constants';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnDestroy {
  @Input() columnId: string | undefined = INITIAL_EMPTY_STRING_VALUE;

  @Input() amountOfTasks: number = INITIAL_EMPTY_NUMBER_VALUE;

  private boardIdSubscription = new Subscription();

  private boardId: string = INITIAL_EMPTY_STRING_VALUE;

  constructor(public dialog: MatDialog, private store: Store, private route: ActivatedRoute) {
    this.boardIdSubscription = this.route.params.subscribe(
      (params) => (this.boardId = params['id']),
    );
  }

  public createTask(): void {
    const dialogRef = this.dialog.open(CreateTaskModalComponent, {
      minWidth: DEFAULT_MODAL_SIZE,
      data: this.amountOfTasks,
    });

    dialogRef.afterClosed().subscribe((newTask: ITask) => {
      if (newTask && this.columnId) {
        const finalTask: ITask = {
          boardId: this.boardId,
          columnId: this.columnId,
          order: this.amountOfTasks + 1,
          ...newTask,
        };
        this.store.dispatch(createTask({ newTask: finalTask }));
      }
    });
  }

  public ngOnDestroy(): void {
    this.boardIdSubscription.unsubscribe();
  }
}
