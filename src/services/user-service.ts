import { add, delete_ as del, getOne, persists, search as repoSearch, update } from '@src/repos/user-repo';
import { IUser } from '@src/models/user';
import { RouteError } from '@src/other/classes';
import {HttpStatusCodes} from '@src/constants/http-status-codes';
import { IQueryUser } from '@src/routes/types/types';

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
export function search(query: IQueryUser): Promise<IUser[]> {
  return repoSearch(query);
}

/**
 * Add one user.
 */
export function addOne(user: IUser): Promise<void> {
  return add(user);
}

/**
 * Update one user.
 */
export async function updateOne(user: IUser): Promise<void> {
  const isPersists = await persists(user.id);
  if (!isPersists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return update(user);
}

/**
 * Delete a user by their id.
 */
export async function _delete(id: number): Promise<void> {
  const isPersists = await persists(id);
  if (!isPersists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return del(id);
}

