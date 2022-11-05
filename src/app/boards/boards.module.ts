import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { BoardsRoutingModule } from './boards-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { BoardsComponent } from './components/boards/boards.component';
import { CreateBoardModalComponent } from './components/create-board-modal/create-board-modal.component';
import { UpdateBoardModalComponent } from './components/update-board-modal/update-board-modal.component';
import { BoardService } from './services/board.service';
import { boardsReducer } from './store/reducers/boards.reducers';
import { BoardsEffects } from './store/effects/boards.effects';

@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardsComponent,
    BoardCardComponent,
    CreateBoardModalComponent,
    UpdateBoardModalComponent,
    CreateBoardComponent,
  ],
  exports: [BoardsPageComponent],
  imports: [
    StoreModule.forFeature('boards', boardsReducer),
    EffectsModule.forFeature([BoardsEffects]),
    CommonModule,
    BoardsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    BoardService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
})
export class BoardsModule {}
