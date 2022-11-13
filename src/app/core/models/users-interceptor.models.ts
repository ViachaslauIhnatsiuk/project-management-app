export interface IGetUserRequest {
  userId: string;
}

export interface IGetUserResponse {
  _id: 'string';
  name: 'string';
  login: 'string';
}

export enum UsersResponseMessages {
  Default = 'Default message',
  Founded = 'Founded user',
  Updated = 'Updated user',
  Deleted = 'Deleted user',
}

export enum Methods {
  Get = 'GET',
  Put = 'PUT',
  Delete = 'DELETE',
}
