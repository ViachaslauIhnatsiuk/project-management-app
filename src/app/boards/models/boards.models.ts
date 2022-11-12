interface IBoard {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
}

interface IBoardDetails extends IBoard {
  columns: IColumn[];
}

interface IColumn {
  _id?: string;
  title?: string;
  order: number;
  boardId?: string;
  tasks?: ITask[];
}

interface ITask {
  _id?: string;
  title: string;
  order?: number;
  description: string;
  userId: string;
  columnId?: string;
  boardId?: string;
  files?: FileType[];
  users?: string[];
}

type ModifiedTaskForRequest = Pick<ITask, '_id' | 'order' | 'columnId'>;

type EditTask = Pick<ITask, 'title' | 'description' | 'users'>;

type FileType = {
  filename: string;
  fileSize: number;
};

enum BoardApiUrls {
  boards = 'boards',
  columns = 'columns',
  tasks = 'tasks',
  columnsSet = 'columnsSet',
  tasksSet = 'tasksSet',
}

export type { IBoard, IBoardDetails, IColumn, ITask, FileType, ModifiedTaskForRequest, EditTask };
export { BoardApiUrls };
