import { Request, Response } from 'express';
import { StorageGetter } from '../../decorators/storageGetter-cookie.decorator.ts';
import * as uuid from 'uuid';

export async function getID(req: Request, res: Response) {
  const userId = req.cookies['user_id'];
  console.log(req.cookies);
  if (!Object.keys(userId || {}).length) {
    const unique = uuid.v4();
    res.cookie('user_id', unique, { maxAge: 3600000, httpOnly: true });
    return unique;
  }
  return userId;
}
