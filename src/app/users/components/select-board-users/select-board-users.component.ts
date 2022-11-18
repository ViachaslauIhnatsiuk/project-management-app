import { Component, EventEmitter, Output, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IUser } from '../../store/models/users.models';
import { selectUser, selectUsers } from '../../store/selectors/users.selectors';

@Component({
  selector: 'app-select-board-users',
  templateUrl: './select-board-users.component.html',
  styleUrls: ['./select-board-users.component.scss'],
})
export class SelectBoardUsersComponent implements OnInit, OnDestroy {
  @Input() public boardUsers: string[] = [];
  @Output() readonly boardUsersChange = new EventEmitter<string[]>();

  public selectedUsers = new FormControl<IUser[]>([]);

  public users$ = this.store.select(selectUsers);
  private usersSubscription = new Subscription();
  public users: IUser[] = [];

  private owner$ = this.store.select(selectUser);
  private ownerSubscription = new Subscription();
  public ownerId: string = '';

  constructor(private store: Store) {
    this.selectedUsers.valueChanges.subscribe((selectedUsers) => {
      if (selectedUsers) {
        const userIdList = selectedUsers.map(({ _id }) => _id);
        this.boardUsersChange.emit(userIdList);
      }
    });
  }

  public ngOnInit(): void {
    this.ownerSubscription = this.owner$.subscribe((user) => (this.ownerId = user!._id));

    this.usersSubscription = this.users$.subscribe((users) => (this.users = users));

    this.setInitialValueForSelectControl();
  }

  private setInitialValueForSelectControl(): void {
    const selectedBoardsInitialValue = [...this.users].filter((user) =>
      this.boardUsers.includes(user._id),
    );

    this.selectedUsers.setValue(selectedBoardsInitialValue);
  }

  public isDisabledOption(userId: string): boolean {
    return userId === this.ownerId;
  }

  public ngOnDestroy(): void {
    this.ownerSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }
}
