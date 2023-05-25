import UserRepo from '@src/repos/UserRepo';
import { IUser } from '@src/models/User';
import { RouteError } from '@src/other/classes';
import {HttpStatusCodes} from '@src/constants/http-status-codes';
import { IQueryUser } from '@src/routes/types/types';

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
function search(query: IQueryUser): Promise<IUser[]> {
  return UserRepo.search(query);
}

/**
 * Add one user.
 */
function addOne(user: IUser): Promise<void> {
  return UserRepo.add(user);
}

/**
 * Update one user.
 */
async function updateOne(user: IUser): Promise<void> {
  const persists = await UserRepo.persists(user.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return UserRepo.update(user);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return UserRepo.delete(id);
}


// **** Export default **** //

export default {
  search: search,
  addOne,
  updateOne,
  delete: _delete,
} as const;
