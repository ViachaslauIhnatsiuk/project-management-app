import { PointCreate } from 'src/app/points/models/points.models';

interface ITasks {
  [key: string]: ITask[];
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
  points?: PointCreate;
}

type ModifiedTaskForRequest = Pick<ITask, '_id' | 'order' | 'columnId'>;

type EditTask = Pick<ITask, 'title' | 'description' | 'users'>;

type FileType = {
  filename: string;
  fileSize: number;
};

export type { ITask, ModifiedTaskForRequest, EditTask, ITasks };
