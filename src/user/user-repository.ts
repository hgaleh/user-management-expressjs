import { IUser } from '@src/user/user-model';
import { getRandomNumber } from '@src/utility/get-random-number';
import {openDb, saveDb} from '../db/mock-orm';
import { IQueryUser } from '@src/user/controller/user-controller-type';


export async function findById(id: number): Promise<IUser | void> {
  const db = await openDb();
  for (const user of db.users) {
    if (user.id === id) {
      return user;
    }
  }
}


/**
 * Search all users.
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

export async function add(user: IUser): Promise<void> {
  const db = await openDb();
  user.id = getRandomNumber();
  db.users.push(user);
  return saveDb(db);
}

export async function update(user: IUser): Promise<void> {
  const db = await openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === user.id) {
      db.users[i] = user;
      return saveDb(db);
    }
  }
}

export async function delete_(id: number): Promise<void> {
  const db = await openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === id) {
      db.users.splice(i, 1);
      return saveDb(db);
    }
  }
}

export async function exists(fieldName: 'id' | 'email' | 'phone', value: string | number): Promise<boolean> {
  const db = await openDb();
  const emailIndex = db.users.findIndex(user => {
    return user[fieldName] == value
  });
  return emailIndex >= 0;
}
