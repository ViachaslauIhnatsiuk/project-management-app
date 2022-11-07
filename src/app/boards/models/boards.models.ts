interface IBoard {
  id?: string;
  title: string;
  description: string;
}

interface IBoardDetails extends IBoard {
  columns: IColumn[];
}

interface IColumn {
  id?: string;
  title: string;
  order?: number;
}

interface IColumnDetails extends IColumn {
  tasks: ITask[];
}
interface ITask {
  id?: string;
  title: string;
  order?: number;
  description: string;
  userId: string;
  files?: FileType[];
}

type FileType = {
  filename: string;
  fileSize: number;
};

enum BoardApiUrls {
  boards = 'boards',
  columns = 'columns',
}

export type { IBoard, IBoardDetails, IColumn, IColumnDetails, ITask, FileType };
export { BoardApiUrls };
