import { Component } from '@angular/core';
import { BoardModalService } from '../../services/board-modal.service';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent {
  constructor(public boardModalService: BoardModalService) {}
}
