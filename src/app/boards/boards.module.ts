import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardsComponent } from './components/boards/boards.component';
import { StoreModule } from '@ngrx/store';
import { boardsReducer } from './store/reducers/boards.reducers';

@NgModule({
  declarations: [BoardsPageComponent, BoardsComponent],
  exports: [BoardsPageComponent],
  imports: [StoreModule.forFeature('boards', boardsReducer), CommonModule, BoardsRoutingModule],
})
export class BoardsModule {}
