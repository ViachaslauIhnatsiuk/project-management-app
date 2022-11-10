export interface ILogInRequest {
  login: string;
  password: string;
}
export interface ILogInResponse {
  token: string;
}

export interface ISignUpRequest {
  name: string;
  login: string;
  password: string;
}

export interface ISignUpResponse {
  _id: string;
  name: string;
  login: string;
}
export interface IResponseError {
  statusCode: number;
  message: string;
}
