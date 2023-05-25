import * as repository from '@src/user/user-repository';
import { IUser } from '@src/user/user-model';
import { HttpStatusCode } from '@src/utility/constant/http-status-code';
import { IQueryUser } from '@src/user/controller/user-controller-type';
import { RouteError } from '@src/utility/route-error';

export const USER_NOT_FOUND_ERR = 'User not found';


export function search(query: IQueryUser): Promise<IUser[]> {
  return repository.search(query);
}

export function addOne(user: IUser): Promise<void> {
  return repository.add(user);
}

export async function updateOne(user: IUser): Promise<void> {
  const isPersists = await repository.persists(user.id);
  if (!isPersists) {
    throw new RouteError(
      HttpStatusCode.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  return repository.update(user);
}

export async function _delete(id: number): Promise<void> {
  const isPersists = await repository.persists(id);
  if (!isPersists) {
    throw new RouteError(
      HttpStatusCode.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  return repository.delete_(id);
}

export async function emailExists(email: string): Promise<boolean> {
  return repository.exists('email', email);
}

export async function phoneExists(email: string): Promise<boolean> {
  return repository.exists('phone', email);
}