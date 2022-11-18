export interface IAuthStateError {
  statusCode: string;
  message: string;
}
export interface IAuthState {
  userId: string;
  userName: string;
  userLogin: string;
  token: string;
  isLoading: boolean;
  error: IAuthStateError;
}

export enum AuthActions {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login success',
  LOGIN_ERROR = '[Auth] Login error',
  LOGOUT = '[Auth] Logout',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup success',
  SIGNUP_ERROR = '[Auth] Signup error',
  GET_USER = '[Auth] Get user',
  GET_USER_SUCCESS = '[Auth] Get user success',
  GET_USER_ERROR = '[Auth] Get user error',
  UPDATE_USER = '[Auth] Update user',
  UPDATE_USER_SUCCESS = '[Auth] Update user success',
  UPDATE_USER_ERROR = '[Auth] Update user error',
  DELETE_USER = '[Auth] Delete user',
  DELETE_USER_SUCCESS = '[Auth] Delete user success',
  DELETE_USER_ERROR = '[Auth] Delete user error',
}
