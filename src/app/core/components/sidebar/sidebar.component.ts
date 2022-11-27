import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderService } from 'src/app/core/services/header.service';
import { selectBoards } from 'src/app/board/boards/store/selectors/boards.selectors';
import { selectColumnsIsLoading } from 'src/app/board/columns/store/selectors/columns.selectors';
import { selectUser } from 'src/app/users/store/selectors/users.selectors';
import { Subscription } from 'rxjs';
import { getBoardsByUserId } from 'src/app/board/boards/store/actions/boards.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterContentChecked, OnDestroy {
  public columnsIsLoading$ = this.store.select(selectColumnsIsLoading);

  public boards$ = this.store.select(selectBoards);

  public user$ = this.store.select(selectUser);

  private userSubscription = new Subscription();

  constructor(
    public headerService: HeaderService,
    private store: Store,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.getBoardsByUserId();
  }

  private getBoardsByUserId(): void {
    this.userSubscription = this.user$.subscribe((user) => {
      if (user && user._id) {
        this.store.dispatch(getBoardsByUserId({ userId: user._id }));
      }
    });
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
