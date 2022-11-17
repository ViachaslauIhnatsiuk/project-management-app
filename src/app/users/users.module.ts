import { NgModule } from '@angular/core';
import { UserService } from './services/user.service';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { usersReducer } from './store/reducers/users.reducers';
import { UsersEffects } from './store/effects/users.effects';
import { SelectBoardUsersComponent } from './components/select-board-users/select-board-users.component';
import { SelectTaskUsersComponent } from './components/select-task-users/select-task-users.component';
import { getUserId } from '../board/boards/helpers/boards.helpers';
import { getUserById } from './store/actions/users.actions';

@NgModule({
  declarations: [SelectBoardUsersComponent, SelectTaskUsersComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  exports: [SelectBoardUsersComponent, SelectTaskUsersComponent],
  providers: [UserService],
})
export class UsersModule {
  constructor(private store: Store) {
    this.getUserById();
  }

  private getUserById(): void {
    const id = getUserId() as string;
    this.store.dispatch(getUserById({ userId: id }));
  }
}
