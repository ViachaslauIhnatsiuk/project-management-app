interface IPoints {
  [key: string]: IPoint[];
}

interface IPoint {
  _id: string;
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
}

type PointCreate = Omit<IPoint, '_id'>;
type PointUpdate = Pick<IPoint, 'title' | 'done'>;

export type { IPoints, IPoint, PointCreate, PointUpdate };
