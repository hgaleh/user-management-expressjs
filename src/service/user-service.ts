import { add, delete_ as del, persists, search as repoSearch, update } from '@src/repository/user-repository';
import { IUser } from '@src/model/user';
import { HttpStatusCode } from '@src/utility/constant/http-status-code';
import { IQueryUser } from '@src/controller/user/user-route-type';
import { RouteError } from '@src/utility/route-error';

export const USER_NOT_FOUND_ERR = 'User not found';


export function search(query: IQueryUser): Promise<IUser[]> {
  return repoSearch(query);
}

export function addOne(user: IUser): Promise<void> {
  return add(user);
}

export async function updateOne(user: IUser): Promise<void> {
  const isPersists = await persists(user.id);
  if (!isPersists) {
    throw new RouteError(
      HttpStatusCode.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  return update(user);
}

export async function _delete(id: number): Promise<void> {
  const isPersists = await persists(id);
  if (!isPersists) {
    throw new RouteError(
      HttpStatusCode.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  return del(id);
}

