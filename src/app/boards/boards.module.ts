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

@NgModule({
  declarations: [BoardsPageComponent, BoardsComponent, BoardCardComponent],
  exports: [BoardsPageComponent],
  imports: [
    StoreModule.forFeature('boards', boardsReducer),
    EffectsModule.forFeature([BoardsEffects]),
    CommonModule,
    BoardsRoutingModule,
  ],
  providers: [BoardService],
})
export class BoardsModule {}
