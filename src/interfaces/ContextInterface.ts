import { Response, Request } from 'express';

export interface ContextInterface {
  res: Response;
  req: Request;
  userId: string;
}
