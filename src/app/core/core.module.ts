import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BoardService } from '../boards/services/board.service';
import { BoardsInterceptor } from './interceptors/boards.interceptor';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [HeaderComponent],
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
