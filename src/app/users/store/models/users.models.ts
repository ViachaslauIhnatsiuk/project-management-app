interface IUsersState {
  user: IUser | null;
  users: IUser[];
  error: IUserError | null;
  isLoading: boolean;
}

interface IUser {
  _id: string;
  name: string;
  login: string;
}

enum UsersActions {
  GET_USERS = '[Users] Get Users',
  GET_USERS_SUCCESS = '[Users] Get Users success',
  GET_USERS_ERROR = '[Users] Get Users error',
  GET_USER_BY_ID = '[Users] Get User By Id',
  GET_USER_BY_ID_SUCCESS = '[Users] Get User By Id success',
  GET_USER_BY_ID_ERROR = '[Users] Get User By Id error',
  UPDATE_USER_BY_ID = '[Users] Update User By Id',
  UPDATE_USER_BY_ID_SUCCESS = '[Users] Update User By Id success',
  UPDATE_USER_BY_ID_ERROR = '[Users] Update User By Id error',
  DELETE_USER_BY_ID = '[Users] Delete User By Id',
  DELETE_USER_BY_ID_SUCCESS = '[Users] Delete User By Id success',
  DELETE_USER_BY_ID_ERROR = '[Users] Delete User By Id error',
}

interface IUserError {
  statusCode: string;
  message: string;
}

export { UsersActions };
export type { IUsersState, IUser, IUserError };
