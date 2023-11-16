import { StorageGetter } from '../../decorators/storageGetter-cookie.decorator.ts';

export const getID = () => {
  console.log(StorageGetter());
};
