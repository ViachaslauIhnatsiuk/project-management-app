import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';

import { BoardsRoutingModule } from './boards-routing.module';
import { ColumnsModule } from '../columns/columns.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { CreateBoardModalComponent } from './components/create-board-modal/create-board-modal.component';
import { UpdateBoardModalComponent } from './components/update-board-modal/update-board-modal.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { BoardService } from './services/board.service';
import { BoardsEffects } from './store/effects/boards.effects';
import { boardsReducer } from './store/reducers/boards.reducers';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';

@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardsComponent,
    BoardCardComponent,
    CreateBoardModalComponent,
    UpdateBoardModalComponent,
    ProjectPageComponent,
    ClickStopPropagationDirective,
  ],
  exports: [BoardsPageComponent],
  imports: [
    StoreModule.forFeature('boards', boardsReducer),
    EffectsModule.forFeature([BoardsEffects]),
    BoardsRoutingModule,
    SharedModule,
    ColumnsModule,
  ],
  providers: [
    BoardService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
})
export class BoardsModule {}
