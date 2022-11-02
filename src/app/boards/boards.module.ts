import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardsComponent } from './components/boards/boards.component';

@NgModule({
  declarations: [BoardsPageComponent, BoardsComponent],
  exports: [BoardsPageComponent],
  imports: [CommonModule, BoardsRoutingModule],
})
export class BoardsModule {}
