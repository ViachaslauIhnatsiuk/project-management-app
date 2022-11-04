import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBoards } from '../../store/actions/boards.actions';
import { selectAllBoards } from '../../store/selectors/boards.selectors';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent {
  public boards$ = this.store.select(selectAllBoards);

  constructor(private store: Store) {
    this.store.dispatch(getBoards());
  }
}
