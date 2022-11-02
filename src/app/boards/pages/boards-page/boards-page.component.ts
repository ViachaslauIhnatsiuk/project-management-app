import { Component } from '@angular/core';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent {
  constructor(public boardService: BoardService) {}
}
