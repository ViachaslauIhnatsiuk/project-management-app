import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderService } from 'src/app/core/services/header.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { languages } from 'src/app/core/constants/header.constants';
import { selectIsAuth, selectIsLoading } from 'src/app/auth/store/selectors/auth.selectors';
import { GlobalSearchService } from '../../services/global-search.service';
import { debounceTime, filter, Observable } from 'rxjs';
import { selectUsers } from 'src/app/users/store/selectors/users.selectors';
import { ISearchResponseItem } from '../../models/global-search.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public readonly languages: string[] = languages;

  public users$ = this.store.select(selectUsers);

  public isLoading$ = this.store.select(selectIsLoading);

  public isAuth$ = this.store.select(selectIsAuth);

  public searchedItems$!: Observable<ISearchResponseItem[]>;

  constructor(
    public headerService: HeaderService,
    public authService: AuthService,
    private store: Store,
    private globalSearchService: GlobalSearchService,
  ) {}

  public onInput(event: any) {
    this.globalSearchService.searchTerm.next(event.target.value);
  }

  ngOnInit() {
    this.globalSearchService.searchTerm
      .pipe(
        debounceTime(1000),
        filter((query) => query.length > 2),
      )
      .subscribe((newValue: string) => {
        this.globalSearchService
          .getSearchResponse(newValue)
          .pipe((response) => (this.searchedItems$ = response));
      });
  }
}
