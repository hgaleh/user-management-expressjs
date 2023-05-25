import * as repository from '@src/user/user-repository';
import { IUser } from '@src/user/user-model';
import { IQueryUser } from '@src/user/controller/user-controller-type';

export function search(query: IQueryUser): Promise<IUser[]> {
  return repository.search(query);
}

export function addOne(user: IUser): Promise<void> {
  return repository.add(user);
}

export async function updateOne(user: IUser): Promise<void> {
  return repository.update(user);
}

export async function _delete(id: number): Promise<void> {
  return repository.delete_(id);
}

export async function emailExists(email: string) {
  const res = await repository.exists('email', email);
  if (res) {
    throw 'email exists!';
  }
}

export async function phoneExists(email: string) {
  const res = await repository.exists('phone', email);
  if (res) {
    throw 'phone exists!';
  }
}

export async function emailIsUnique(id: number, email: string) {
  const exists = await repository.exists('email', email);
  const person = await repository.findById(id) as IUser;
  if (exists && person.email != email) {
    throw 'email is not unique!';
  }
}

export async function phoneIsUnique(id: number, phone: string) {
  const exists = await repository.exists('phone', phone);
  const person = await repository.findById(id) as IUser;
  if (exists && person.phone != phone) {
    throw 'phone is not unique!';
  }
}

export async function idExists(id: number) {
  const exists = await repository.exists('id', id);

  if (!exists) {
    throw 'is does not exist!';
  }
}