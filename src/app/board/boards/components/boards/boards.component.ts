import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { logInSuccess } from 'src/app/auth/store/actions/auth.actions';
import { getUsers } from 'src/app/users/store/actions/users.actions';
import { selectUser } from 'src/app/users/store/selectors/users.selectors';

import { getBoardsByUserId } from '../../store/actions/boards.actions';
import { selectBoards } from '../../store/selectors/boards.selectors';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnDestroy, OnInit {
  public boards$ = this.store.select(selectBoards);

  public user$ = this.store.select(selectUser);

  private userSubscription = new Subscription();

  constructor(private store: Store) {
    this.getBoardsByUserId();
    this.store.dispatch(getUsers());
  }

  ngOnInit(): void {
    const token = window.localStorage.getItem('token') as string;
    this.store.dispatch(logInSuccess({ token }));
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
}
