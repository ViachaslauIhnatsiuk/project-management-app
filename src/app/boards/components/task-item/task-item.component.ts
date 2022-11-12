import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { INITIAL_EMPTY_STRING_VALUE } from '../../constants/boards.constants';
import { MIN_WIDTH_MODAL } from '../../constants/create-board-modal.constants';
import { EditTask, ITask } from '../../models/boards.models';
import { deleteTask, updateTask } from '../../store/actions/task.actions';

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
      minWidth: MIN_WIDTH_MODAL,
    });

    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm && idTask) this.store.dispatch(deleteTask({ task: this.task }));
    });
  }

  public editTask(): void {
    const { description, title } = this.task;

    const dialogRef = this.dialog.open(EditTaskModalComponent, {
      data: { title, description },
    });

    dialogRef.afterClosed().subscribe((editedTask: EditTask) => {
      if (editedTask) {
        const finalTask: ITask = {
          ...this.task,
          ...editedTask,
        };
        this.store.dispatch(updateTask({ updatedTask: finalTask }));
      }
    });
  }
}
