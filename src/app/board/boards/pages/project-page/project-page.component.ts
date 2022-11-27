import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { getPointsByUserId } from 'src/app/points/store/actions/points.actions';
import { getUsers } from 'src/app/users/store/actions/users.actions';
import { selectUser } from 'src/app/users/store/selectors/users.selectors';
import { getBoardById } from '../../store/actions/boards.actions';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnDestroy {
  private users$ = this.store.select(selectUser);
  private userSubscription = new Subscription();

  private boardIdSubscription = new Subscription();

  constructor(private store: Store, private route: ActivatedRoute) {
    this.getBoardById();
    this.store.dispatch(getUsers());
    this.getPointsByUserId();
  }

  private getPointsByUserId(): void {
    this.userSubscription = this.users$.subscribe((user) => {
      if (user && user._id) {
        this.store.dispatch(getPointsByUserId({ userId: user._id }));
      }
    });
  }

  private getBoardById(): void {
    this.boardIdSubscription = this.route.params.subscribe((params) => {
      this.store.dispatch(getBoardById({ boardId: params['id'] }));
    });
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.boardIdSubscription.unsubscribe();
  }
}
