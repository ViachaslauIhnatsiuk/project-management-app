import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';

import { BoardsRoutingModule } from './boards-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { CreateBoardModalComponent } from './components/create-board-modal/create-board-modal.component';
import { UpdateBoardModalComponent } from './components/update-board-modal/update-board-modal.component';
import { BoardService } from './services/board.service';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ColumnService } from './services/column.service';
import { BoardsEffects } from './store/effects/boards.effects';
import { ColumnEffects } from './store/effects/column.effects';
import { boardsReducer } from './store/reducers/boards.reducers';
import { ColumnsComponent } from './components/columns/columns.component';
import { ColumnItemComponent } from './components/column-item/column-item.component';
import { CreateColumnComponent } from './components/create-column/create-column.component';
import { CreateColumnModalComponent } from './components/create-column-modal/create-column-modal.component';

@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardsComponent,
    BoardCardComponent,
    CreateBoardModalComponent,
    UpdateBoardModalComponent,
    CreateBoardComponent,
    ProjectPageComponent,
    ColumnsComponent,
    ColumnItemComponent,
    CreateColumnComponent,
    CreateColumnModalComponent,
  ],
  exports: [BoardsPageComponent],
  imports: [
    StoreModule.forFeature('boards', boardsReducer),
    EffectsModule.forFeature([BoardsEffects, ColumnEffects]),
    CommonModule,
    BoardsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    BoardService,
    ColumnService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
})
export class BoardsModule {}
