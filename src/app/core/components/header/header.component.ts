import { Component, OnDestroy, OnInit, AfterContentChecked } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DEBOUNCE_TIME, MIN_QUERY_LENGTH } from 'src/app/core/constants/header.constants';
import { selectIsAuth, selectIsLoading } from 'src/app/auth/store/selectors/auth.selectors';
import {
  BehaviorSubject,
  debounceTime,
  filter,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { selectUsers } from 'src/app/users/store/selectors/users.selectors';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormBuilder } from '@angular/forms';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { TaskService } from 'src/app/board/tasks/services/task.service';
import { ITask } from 'src/app/board/tasks/models/tasks.models';
import { Languages } from '../../models/core.models';
import { selectBoards } from 'src/app/board/boards/store/selectors/boards.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterContentChecked, OnDestroy {
  public isNotWelcomePage!: boolean;

  public currentLanguage = window.localStorage.getItem('language') || Languages.En;

  public users$ = this.store.select(selectUsers);
  public boards$ = this.store.select(selectBoards);
  public isLoading$ = this.store.select(selectIsLoading);
  public isAuth$ = this.store.select(selectIsAuth);

  public tasksByQuery$!: Observable<ITask[]>;
  public isSearched$ = new BehaviorSubject(false);
  private searchTermSubscription = new Subscription();

  public mode: ProgressSpinnerMode = 'indeterminate';

  public searchForm = this.fb.group({
    searchInput: [''],
  });

  constructor(
    public headerService: HeaderService,
    public authService: AuthService,
    private store: Store,
    private translate: TranslateService,
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  public onInput(event: Event): void {
    this.taskService.searchTerm.next((event.target as HTMLInputElement).value);
  }

  public onBlur(): void {
    const inputValue = this.searchForm.controls.searchInput.value;
    if (!inputValue?.length) {
      this.tasksByQuery$ = of();
    }
  }

  public openFoundBoard(event: MatAutocompleteSelectedEvent): void {
    const boardId = event.option.value.boardId;
    this.router.navigate([`boards/${boardId}`]);
    this.searchForm.reset();
  }

  ngOnInit() {
    this.searchTasksByInputValue();
  }

  public ngAfterContentChecked() {
    this.isNotWelcomePage = !this.router.url.includes('welcome');
  }

  public searchTasksByInputValue(): void {
    this.searchTermSubscription = this.taskService.searchTerm
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        filter((query) => query.length > MIN_QUERY_LENGTH),
        tap(() => this.isSearched$.next(true)),
        switchMap((searchQuery) =>
          this.taskService
            .getTasksByQuery(searchQuery)
            .pipe(tap(() => this.isSearched$.next(false))),
        ),
        switchMap((tasks) =>
          this.boards$.pipe(
            map((userboards) => {
              const userBoardIds = userboards.map((board) => board._id);
              return tasks.filter((task) => userBoardIds.includes(task.boardId));
            }),
          ),
        ),
      )
      .subscribe((tasks) => (this.tasksByQuery$ = of(tasks)));
  }

  public ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
  }

  public switchLanguage(value: string): void {
    this.currentLanguage = value;
    this.translate.use(value.toLowerCase());
    window.localStorage.setItem('language', value);
  }
}
