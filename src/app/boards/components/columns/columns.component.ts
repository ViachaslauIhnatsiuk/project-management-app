import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getBoardById } from '../../store/actions/boards.actions';
import { selectColumns } from '../../store/selectors/boards.selectors';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss'],
})
export class ColumnsComponent implements OnInit, OnDestroy {
  private idBoardSub = new Subscription();

  private idActiveBoard: string = '';

  public columns$ = this.store.select(selectColumns);

  constructor(private route: ActivatedRoute, private store: Store) {
    this.idBoardSub = this.route.params.subscribe((params) => (this.idActiveBoard = params['id']));
  }

  ngOnInit(): void {
    if (this.idActiveBoard) {
      this.store.dispatch(getBoardById({ idBoard: this.idActiveBoard }));
    }
  }

  ngOnDestroy(): void {
    this.idBoardSub.unsubscribe();
  }
}
