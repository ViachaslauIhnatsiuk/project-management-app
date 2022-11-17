import { IUsersState } from '../models/users.models';

const initialUsersState: IUsersState = {
  user: null,
  users: [],
  error: null,
  isLoading: false,
};

export { initialUsersState };
