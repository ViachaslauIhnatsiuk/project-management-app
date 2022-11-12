import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from 'src/app/shared/shared.module';
import { EditTaskModalComponent } from './components/edit-task-modal/edit-task-modal.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskService } from './services/task.service';
import { tasksReducer } from './store/reducers/tasks.reducers';
import { TaskEffects } from './store/effects/task.effects';

@NgModule({
  declarations: [
    TaskItemComponent,
    CreateTaskModalComponent,
    CreateTaskComponent,
    EditTaskModalComponent,
    TasksComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TaskEffects]),
  ],
  exports: [TasksComponent],
  providers: [TaskService],
})
export class TasksModule {}
