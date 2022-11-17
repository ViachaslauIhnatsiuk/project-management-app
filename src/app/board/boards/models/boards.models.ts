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
  boardsSet = 'boardsSet',
  columnsSet = 'columnsSet',
  tasksSet = 'tasksSet',
}

export type { IBoard };
export { BoardApiEndpoints };
