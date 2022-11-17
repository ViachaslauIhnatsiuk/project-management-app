import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { deleteTask, updateTask } from '../../store/actions/task.actions';
import { ITask } from '../../models/tasks.models';
import { DEFAULT_MODAL_SIZE, INITIAL_EMPTY_STRING_VALUE } from '../../../constants/board.constants';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: ITask;

  @Input() columnId: string = INITIAL_EMPTY_STRING_VALUE;

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
}
