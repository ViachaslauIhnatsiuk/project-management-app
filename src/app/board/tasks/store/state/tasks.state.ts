import { ITasksState } from '../models/task.models';

const initialTasksState: ITasksState = {
  tasks: {},
  isLoading: false,
  error: '',
};

export { initialTasksState };
