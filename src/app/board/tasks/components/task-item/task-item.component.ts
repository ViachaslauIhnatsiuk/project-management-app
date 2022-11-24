import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { deleteTask, updateTask } from '../../store/actions/task.actions';
import { ITask, ITaskPointsInfo } from '../../models/tasks.models';
import { DEFAULT_MODAL_SIZE, INITIAL_EMPTY_STRING_VALUE } from '../../../constants/board.constants';
import { selectPoints } from 'src/app/points/store/selectors/points.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit, OnDestroy {
  @Input() task!: ITask;

  @Input() columnId: string = INITIAL_EMPTY_STRING_VALUE;

  private taskPointsSubscription = new Subscription();

  private taskPoints$ = this.store.select(selectPoints);

  public taskPointsInfo: ITaskPointsInfo = { amount: null, done: null };

  constructor(private store: Store, public dialog: MatDialog) {}

  public deleteTask(): void {
    const { _id: idTask } = this.task;
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      minWidth: DEFAULT_MODAL_SIZE,
    });

    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm && idTask) this.store.dispatch(deleteTask({ task: this.task }));
    });
  }

  public editTask(): void {
    const dialogRef = this.dialog.open(EditTaskModalComponent, {
      data: this.task,
    });

    dialogRef.afterClosed().subscribe((editedTask: ITask) => {
      if (editedTask) {
        const modifiedTask: ITask = {
          ...this.task,
          ...editedTask,
        };

        this.store.dispatch(updateTask({ updatedTask: modifiedTask }));
      }
    });
  }

  private getTaskPointsData(): void {
    this.taskPointsSubscription = this.taskPoints$.subscribe((points) => {
      if (points[this.task._id!]) {
        this.taskPointsInfo.amount = points[this.task._id!].length;
        this.taskPointsInfo.done = points[this.task._id!].filter((point) => point.done).length;
      }
    });
  }

  ngOnInit(): void {
    this.getTaskPointsData();
  }

  ngOnDestroy(): void {
    this.taskPointsSubscription.unsubscribe();
  }
}
