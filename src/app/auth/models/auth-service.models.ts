export interface IJWTPayload {
  exp: number;
  iat: number;
  id: string;
  login: string;
}

export enum MagicNumbers {
  Zero = 0,
  Thousand = 1000,
}
