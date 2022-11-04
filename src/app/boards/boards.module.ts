import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardsComponent } from './components/boards/boards.component';
import { StoreModule } from '@ngrx/store';
import { boardsReducer } from './store/reducers/boards.reducers';
import { BoardService } from './services/board.service';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from './store/effects/boards.effects';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { CreateBoardModalComponent } from './components/create-board-modal/create-board-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateBoardModalComponent } from './components/update-board-modal/update-board-modal.component';
import { SharedModule } from '../shared/shared.module';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
