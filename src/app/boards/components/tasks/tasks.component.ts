import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';

import { INITIAL_EMPTY_STRING_VALUE } from '../../constants/boards.constants';
import { ITask, ModifiedTaskForRequest } from '../../models/boards.models';
import { setTasksById, updateOrderAllTasks } from '../../store/actions/task.actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() public tasks: ITask[] = [];

  @Input() public columnId: string = INITIAL_EMPTY_STRING_VALUE;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    if (this.tasks) {
      this.tasks = [...this.tasks];
    }
  }

  public dropTask({
    currentIndex,
    previousIndex,
    previousContainer,
    container,
  }: CdkDragDrop<ITask[]>) {
    if (previousContainer === container) {
      if (currentIndex === previousIndex) return;
      moveItemInArray(container.data, previousIndex, currentIndex);

      const currentColumnTasks = this.dispatchTasksToStore(container.data, this.columnId);

      const modifiedTasksForRequest = this.modifyTasksForRequest(currentColumnTasks);

      this.store.dispatch(updateOrderAllTasks({ tasks: modifiedTasksForRequest }));
    } else {
      transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);

      const currentColumnTasks = this.dispatchTasksToStore(container.data, this.columnId);

      const previousColumnId = container.data[currentIndex].columnId as string;
      const previousColumnTasks = this.dispatchTasksToStore(
        previousContainer.data,
        previousColumnId,
      );

      const allTasks = currentColumnTasks.concat(previousColumnTasks);
      const modifiedTasksForRequest = this.modifyTasksForRequest(allTasks);
      this.store.dispatch(updateOrderAllTasks({ tasks: modifiedTasksForRequest }));
    }
  }

  private dispatchTasksToStore(tasks: ITask[], columnId: string): ITask[] {
    const updatedTasks = this.updateOrderAndColumnIdOfTasks(tasks, columnId);
    this.store.dispatch(setTasksById({ tasks: updatedTasks, columnId }));
    return updatedTasks;
  }

  private modifyTasksForRequest(tasks: ITask[]): ModifiedTaskForRequest[] {
    const modifiedTasks: ModifiedTaskForRequest[] = tasks.map(
      ({ _id, columnId }, index): ModifiedTaskForRequest => {
        const modifiedTask: ModifiedTaskForRequest = {
          _id,
          order: index + 1,
          columnId,
        };

        return modifiedTask;
      },
    );

    return modifiedTasks;
  }

  private updateOrderAndColumnIdOfTasks(tasks: ITask[], columnId?: string): ITask[] {
    const updatedTasks: ITask[] = tasks.map((task, index): ITask => {
      const id = columnId || task.columnId;
      const updatedTask: ITask = { ...task, order: index + 1, columnId: id };

      return updatedTask;
    });

    return updatedTasks;
  }
}
