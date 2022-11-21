import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderService } from 'src/app/core/services/header.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  DEBOUNCE_TIME,
  languages,
  MIN_QUERY_LENGTH,
} from 'src/app/core/constants/header.constants';
import { selectIsAuth, selectIsLoading } from 'src/app/auth/store/selectors/auth.selectors';
import { GlobalSearchService } from '../../services/global-search.service';
import { debounceTime, filter, Observable, Subscription } from 'rxjs';
import { selectUsers } from 'src/app/users/store/selectors/users.selectors';
import { ISearchResponseItem } from '../../models/global-search.models';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public readonly languages: string[] = languages;

  public users$ = this.store.select(selectUsers);

  public isLoading$ = this.store.select(selectIsLoading);

  public isAuth$ = this.store.select(selectIsAuth);

  public searchedItems$!: Observable<ISearchResponseItem[]>;

  private searchTermSubscription = new Subscription();

  searchForm = this.fb.group({
    searchInput: [''],
  });

  constructor(
    public headerService: HeaderService,
    public authService: AuthService,
    private store: Store,
    private globalSearchService: GlobalSearchService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  public onInput(event: Event): void {
    this.globalSearchService.searchTerm.next((event.target as HTMLInputElement).value);
  }

  public openFoundBoard(event: MatAutocompleteSelectedEvent): void {
    const boardId = event.option.value.boardId;
    this.router.navigate([`boards/${boardId}`]);
    this.searchForm.reset();
  }

  ngOnInit() {
    this.searchTermSubscription = this.globalSearchService.searchTerm
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        filter((query) => query.length > MIN_QUERY_LENGTH),
      )
      .subscribe((newValue: string) => {
        this.globalSearchService
          .getSearchResponse(newValue)
          .pipe((response) => (this.searchedItems$ = response));
      });
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
  }
}
