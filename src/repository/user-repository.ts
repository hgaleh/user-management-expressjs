import { IUser } from '@src/model/user';
import { getRandomNumber } from '@src/utility/get-random-number';
import {openDb, saveDb} from './mock-orm';
import { IQueryUser } from '@src/controller/user/user-route-type';

// **** Functions **** //

/**
 * Get one user.
 */
export async function getOne(email: string): Promise<IUser | null> {
  const db = await openDb();
  for (const user of db.users) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
}

/**
 * See if a user with the given id exists.
 */
export async function persists(id: number): Promise<boolean> {
  const db = await openDb();
  for (const user of db.users) {
    if (user.id === id) {
      return true;
    }
  }
  return false;
}
/**
 * Get all users.
 */
export async function search(query: IQueryUser): Promise<IUser[]> {
  const db = await openDb();
  return db.users.filter(user => {
    return (!query.email || user.email.includes(query.email)) &&
            (!query.firstName || user.firstName.includes(query.firstName)) &&
            (!query.lastName || user.lastName.includes(query.lastName)) &&
            (!query.phone || user.phone.includes(query.phone));
  });
}

/**
 * Add one user.
 */
export async function add(user: IUser): Promise<void> {
  const db = await openDb();
  user.id = getRandomNumber();
  db.users.push(user);
  return saveDb(db);
}

/**
 * Update a user.
 */
export async function update(user: IUser): Promise<void> {
  const db = await openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === user.id) {
      db.users[i] = user;
      return saveDb(db);
    }
  }
}

/**
 * Delete one user.
 */
export async function delete_(id: number): Promise<void> {
  const db = await openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === id) {
      db.users.splice(i, 1);
      return saveDb(db);
    }
  }
}
