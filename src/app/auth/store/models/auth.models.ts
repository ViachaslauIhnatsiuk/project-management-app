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
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup success',
  SIGNUP_ERROR = '[Auth] Signup error',
  GET_USER = '[Auth] Get user',
  GET_USER_SUCCESS = '[Auth] Get user success',
  GET_USER_ERROR = '[Auth] Get user error',
}
