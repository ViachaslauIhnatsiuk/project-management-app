interface IBoard {
  id?: string;
  title: string;
  description: string;
}

type TokenObj = { token: string };

enum BoardApiUrls {
  boards = 'boards',
}

export type { IBoard, TokenObj };
export { BoardApiUrls };
