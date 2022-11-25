import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setBoardSortType } from '../../store/actions/boards.actions';
import { BoardSortTypes } from '../../store/models/boards.models';
import { selectBoardSortType } from '../../store/selectors/boards.selectors';

@Component({
  selector: 'app-sorting-boards',
  templateUrl: './sorting-boards.component.html',
  styleUrls: ['./sorting-boards.component.scss'],
})
export class SortingBoardsComponent implements OnInit, OnDestroy {
  public sortType: string = BoardSortTypes.INITIAL;
  public sortType$ = this.store.select(selectBoardSortType);
  private sortTypeSubscription = new Subscription();

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.sortTypeSubscription = this.sortType$.subscribe((type) => (this.sortType = type));
  }

  public toggleSortType(): void {
    const { TITLE_ASC, TITLE_DESC, INITIAL } = BoardSortTypes;

    const sortType = this.sortType === TITLE_DESC || INITIAL ? TITLE_ASC : TITLE_DESC;

    this.store.dispatch(setBoardSortType({ sortType }));
  }

  public setVisibilityBySortType(type: string): boolean {
    if (!this.sortType && type === BoardSortTypes.TITLE_ASC) return true;

    return this.sortType === type;
  }

  public ngOnDestroy(): void {
    this.sortTypeSubscription.unsubscribe();
  }
}
