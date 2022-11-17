import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IBoard } from 'src/app/board/boards/models/boards.models';
import { selectSelectedBoard } from 'src/app/board/boards/store/selectors/boards.selectors';

import { IUser } from '../../store/models/users.models';
import { selectUsers } from '../../store/selectors/users.selectors';

@Component({
  selector: 'app-select-task-users',
  templateUrl: './select-task-users.component.html',
  styleUrls: ['./select-task-users.component.scss'],
})
export class SelectTaskUsersComponent implements OnInit, OnDestroy {
  @Input() public taskUsers: string[] = [];
  @Output() readonly taskUsersChange = new EventEmitter<string[]>();

  public selectedUsers = new FormControl<IUser[]>([]);

  private users$ = this.store.select(selectUsers);
  private usersSubscription = new Subscription();
  private users: IUser[] = [];

  private board$ = this.store.select(selectSelectedBoard);
  private boardSubscription = new Subscription();
  private board!: IBoard;

  public boardUsers: IUser[] = [];

  constructor(private store: Store) {
    this.selectedUsers.valueChanges.subscribe((selectedUsers) => {
      if (selectedUsers) {
        const userIdList = selectedUsers.map(({ _id }) => _id);
        this.taskUsersChange.emit(userIdList);
      }
    });
  }

  ngOnInit() {
    this.boardSubscription = this.board$.subscribe((board) => (this.board = board as IBoard));

    this.usersSubscription = this.users$.subscribe((users) => (this.users = users));

    this.getBoardUsers();
    this.setInitialValueForSelectControl();
  }

  private getBoardUsers(): void {
    const currentBoardUsers = [...this.board.users, this.board.owner];
    this.boardUsers = this.users.filter(({ _id }) => currentBoardUsers.includes(_id));
  }

  private setInitialValueForSelectControl(): void {
    const selectedUsersInitialValue = [...this.boardUsers].filter((user) =>
      this.taskUsers.includes(user._id),
    );

    this.selectedUsers.setValue(selectedUsersInitialValue);
  }

  public ngOnDestroy(): void {
    this.boardSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }
}
