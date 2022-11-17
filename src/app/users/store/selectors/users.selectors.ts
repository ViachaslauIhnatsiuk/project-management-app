import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUser, IUsersState } from '../models/users.models';

const selectFeatureUsers = createFeatureSelector<IUsersState>('users');

const selectUsers = createSelector(selectFeatureUsers, (state): IUser[] => state.users);

const selectUser = createSelector(selectFeatureUsers, (state): IUser | null => state.user);

export { selectFeatureUsers, selectUsers, selectUser };
