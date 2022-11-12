import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from 'src/app/shared/shared.module';
import { TasksModule } from '../tasks/tasks.module';
import { ColumnItemComponent } from './components/column-item/column-item.component';
import { CreateColumnComponent } from './components/create-column/create-column.component';
import { CreateColumnModalComponent } from './components/create-column-modal/create-column-modal.component';
import { ColumnsComponent } from './components/columns/columns.component';
import { ColumnService } from './services/column.service';
import { columnsReducer } from './store/reducers/columns.reducers';
import { ColumnEffects } from './store/effects/columns.effects';

@NgModule({
  declarations: [
    ColumnsComponent,
    ColumnItemComponent,
    CreateColumnComponent,
    CreateColumnModalComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('columns', columnsReducer),
    EffectsModule.forFeature([ColumnEffects]),
    TasksModule,
  ],
  exports: [ColumnsComponent],
  providers: [ColumnService],
})
export class ColumnsModule {}
