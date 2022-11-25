import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map, Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { setBoardFilters } from '../../store/actions/boards.actions';
import { BoardFilters } from '../../store/models/boards.models';
import { selectBoardFilters } from '../../store/selectors/boards.selectors';

@Component({
  selector: 'app-search-boards',
  templateUrl: './search-boards.component.html',
  styleUrls: ['./search-boards.component.scss'],
})
export class SearchBoardsComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  private filters$ = this.store.select(selectBoardFilters);
  private filtersSubscription = new Subscription();
  private filters!: BoardFilters;

  constructor(private store: Store) {
    this.filters$.subscribe((filters) => (this.filters = filters));
  }

  public ngOnInit(): void {
    this.initializeForm();
    this.setFiltersByChangeInput();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      searchInput: new FormControl<string>(this.filters.byTitle),
    });
  }

  private setFiltersByChangeInput(): void {
    this.form.controls['searchInput'].valueChanges
      .pipe(
        map((value) => value?.trim()),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((filterByTitleValue) => {
        const updatedFilters: BoardFilters = {
          ...this.filters,
          byTitle: filterByTitleValue || '',
        };

        LocalStorageService.set<BoardFilters>('filters', updatedFilters);

        this.store.dispatch(setBoardFilters({ filters: updatedFilters }));
      });
  }

  public ngOnDestroy(): void {
    this.filtersSubscription.unsubscribe();
  }
}
