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
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardsComponent,
    BoardCardComponent,
    CreateBoardModalComponent,
  ],
  exports: [BoardsPageComponent],
  imports: [
    StoreModule.forFeature('boards', boardsReducer),
    EffectsModule.forFeature([BoardsEffects]),
    CommonModule,
    BoardsRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [BoardService],
})
export class BoardsModule {}
