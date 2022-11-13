import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ITask, ModifiedTaskForRequest } from '../../models/tasks.models';
import { getTasks, setTasksById, updateOrderAllTasks } from '../../store/actions/task.actions';
import { selectTasks } from '../../store/selectors/tasks.selectors';
import {
  INITIAL_EMPTY_NUMBER_VALUE,
  INITIAL_EMPTY_STRING_VALUE,
} from '../../../constants/board.constants';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  @Input() public columnId: string = INITIAL_EMPTY_STRING_VALUE;

  public tasks: ITask[] = [];

  public amountOfTasks: number = INITIAL_EMPTY_NUMBER_VALUE;

  private boardIdSubscription = new Subscription();

  private boardId: string = INITIAL_EMPTY_STRING_VALUE;

  private tasks$ = this.store.select(selectTasks);

  constructor(private store: Store, private route: ActivatedRoute) {
    this.boardIdSubscription = this.route.params.subscribe(
      (params) => (this.boardId = params['id']),
    );

    this.tasks$.subscribe((tasks) => {
      this.tasks = tasks[this.columnId];
      if (this.tasks) {
        this.tasks = [...this.tasks];
        this.amountOfTasks = this.tasks.length;
      }
    });
  }

  public ngOnInit(): void {
    this.store.dispatch(getTasks({ props: { boardId: this.boardId, columnId: this.columnId } }));
  }

  public ngOnDestroy(): void {
    this.boardIdSubscription.unsubscribe();
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
