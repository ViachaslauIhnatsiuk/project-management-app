interface IBoards {
  boards: IBoard[];
}

interface IBoard {
  id?: string;
  title: string;
  description: string;
}

export type { IBoards, IBoard };
