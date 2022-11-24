import { NgModule } from '@angular/core';
import { UserService } from './services/user.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { SelectBoardUsersComponent } from './components/select-board-users/select-board-users.component';
import { SelectTaskUsersComponent } from './components/select-task-users/select-task-users.component';
import { usersReducer } from './store/reducers/users.reducers';
import { UsersEffects } from './store/effects/users.effects';

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
export class UsersModule {}
