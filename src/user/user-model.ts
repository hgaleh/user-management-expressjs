// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an ' + 
  'object with the appropriate user keys.';

export enum UserRoles {
  Standard,
  Admin,
}


// **** Types **** //

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// **** Functions **** //

/**
 * Create new User.
 */
export function new_(
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: string,
  id?: number, // id last cause usually set by db
): IUser {
  return {
    id: (id ?? -1),
    firstName: (firstName ?? ''),
    lastName: (lastName ?? ''),
    email: (email ?? ''),
    phone: (phone ?? '')
  };
}

/**
 * Get user instance from object.
 */
export function from(param: object): IUser {
  // Check is user
  if (!isUser(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  // Get user instance
  const p = param as IUser;
  return new_(p.firstName, p.lastName, p.email, p.phone, p.id);
}

/**
 * See if the param meets criteria to be a user.
 */
export function isUser(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg &&
    'email' in arg &&
    'firstName' in arg &&
    'lastName' in arg &&
    'phone' in arg &&
    'role' in arg
  );
}

export function isUserValidForAdd(arg: any): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    arg['firstName'] &&
    arg['lastName'] &&
    arg['email'] &&
    arg['phone']
  );
}