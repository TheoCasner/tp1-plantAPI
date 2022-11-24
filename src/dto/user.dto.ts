export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateUserDto {
  age: number;
  role: ROLE;
}

export class UpdateUserRole {
  id: number;
  role: ROLE;
}

export class UserDto {
  id: number;
  age: number;
  role: string;
}
