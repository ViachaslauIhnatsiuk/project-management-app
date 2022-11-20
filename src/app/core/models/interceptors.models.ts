export enum Methods {
  Get = 'GET',
  Put = 'PUT',
  Delete = 'DELETE',
  Patch = 'PUTCH',
}

export interface IResponseError {
  statusCode: number;
  message: string;
}

export enum ApiEndpoints {
  Auth = 'auth',
  Boards = 'boards',
  Columns = 'columns',
  Tasks = 'tasks',
  BoardsSet = 'boardsSet',
  ColumnsSet = 'columnsSet',
  TasksSet = 'tasksSet',
  Users = 'users',
  Points = 'points',
}

export enum ApiEndpointActions {
  Signup = 'signup',
  Signin = 'signin',
}
