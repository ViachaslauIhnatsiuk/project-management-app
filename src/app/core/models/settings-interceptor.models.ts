interface IEditUserDataRequest {
  name: string;
  login: string;
  password: string;
}

interface IEditUserDataResponse {
  _id: string;
  name: string;
  login: string;
}

interface IEditUserDataError {
  statusCode: number;
  message: string;
}

export { IEditUserDataRequest, IEditUserDataResponse, IEditUserDataError };
