import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsInterceptor } from './interceptors/boards.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BoardService } from '../boards/services/board.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    BoardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BoardsInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
