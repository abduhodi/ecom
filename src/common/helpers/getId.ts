import { Request, Response } from 'express';
import { StorageGetter } from '../../decorators/storageGetter-cookie.decorator.ts';
import * as uuid from 'uuid';

export async function getID(req: Request, res: Response) {
  const userId = req.cookies['user_id'];
  if (!userId) {
    const unique = uuid.v4();
    console.log(unique);
    res.cookie('user_id', unique, {
      maxAge: 900000,
      httpOnly: true,
      domain: 'localhost:5174',
      sameSite: 'none',
    });
    res.send('cookie set');
    return unique;
  }
  return userId;
}
