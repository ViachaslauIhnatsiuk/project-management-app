import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IBoard } from '../../models/boards.models';
import { BoardModalService } from '../../services/board-modal.service';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() board!: IBoard;

  constructor(private boardModalService: BoardModalService, private store: Store) {}
}
