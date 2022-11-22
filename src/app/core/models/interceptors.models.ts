export enum Methods {
  Get = 'GET',
  Put = 'PUT',
  Post = 'POST',
  Delete = 'DELETE',
  Patch = 'PATCH',
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
