interface IBoard {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
}

enum BoardApiEndpoints {
  boards = 'boards',
  columns = 'columns',
  tasks = 'tasks',
  columnsSet = 'columnsSet',
  tasksSet = 'tasksSet',
}

export type { IBoard };
export { BoardApiEndpoints };
