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

export { IEditUserDataRequest, IEditUserDataResponse };
