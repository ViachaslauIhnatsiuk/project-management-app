import { createAction, props } from '@ngrx/store';
import { IUpdatedUserData, IUser, IUserError, UsersActions } from '../models/users.models';

const getUsers = createAction(UsersActions.GET_USERS);
const getUsersSuccess = createAction(UsersActions.GET_USERS_SUCCESS, props<{ users: IUser[] }>());
const getUsersError = createAction(UsersActions.GET_USERS_ERROR, props<{ error: IUserError }>());

const getUserById = createAction(UsersActions.GET_USER_BY_ID, props<{ id: string }>());
const getUserByIdSuccess = createAction(
  UsersActions.GET_USER_BY_ID_SUCCESS,
  props<{ user: IUser }>(),
);
const getUserByIdError = createAction(
  UsersActions.GET_USER_BY_ID_ERROR,
  props<{ error: IUserError }>(),
);

const updateUserById = createAction(
  UsersActions.UPDATE_USER_BY_ID,
  props<{ id: string; updatedUserData: IUpdatedUserData }>(),
);
const updateUserByIdSuccess = createAction(
  UsersActions.UPDATE_USER_BY_ID_SUCCESS,
  props<{ updatedUser: IUser }>(),
);
const updateUserByIdError = createAction(
  UsersActions.UPDATE_USER_BY_ID_ERROR,
  props<{ error: IUserError }>(),
);

const deleteUserById = createAction(UsersActions.DELETE_USER_BY_ID, props<{ id: string }>());
const deleteUserByIdSuccess = createAction(
  UsersActions.DELETE_USER_BY_ID_SUCCESS,
  props<{ deletedUser: IUser }>(),
);
const deleteUserByIdError = createAction(
  UsersActions.DELETE_USER_BY_ID_ERROR,
  props<{ error: IUserError }>(),
);

export {
  getUsers,
  getUserById,
  updateUserById,
  updateUserByIdError,
  deleteUserById,
  getUsersSuccess,
  getUsersError,
  getUserByIdSuccess,
  getUserByIdError,
  updateUserByIdSuccess,
  deleteUserByIdSuccess,
  deleteUserByIdError,
};
