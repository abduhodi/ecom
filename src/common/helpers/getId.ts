import { Request, Response } from 'express';
import { StorageGetter } from '../../decorators/storageGetter-cookie.decorator.ts';
import * as uuid from 'uuid';

export async function getID(
  req: Request, res: Response,
) {
  const userId = req.cookies['user_id'];
  if (!userId) {
    const unique = uuid.v4();
    res.cookie('user_id', unique);
    return unique;
  }
  return userId;
}
