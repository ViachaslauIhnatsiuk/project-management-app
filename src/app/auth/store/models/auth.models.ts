export interface IAuthStateError {
  statusCode: string;
  message: string;
}
export interface IAuthState {
  token: string;
  isAuth: boolean;
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
}
