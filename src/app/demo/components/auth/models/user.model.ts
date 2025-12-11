import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
  id: number;
  password: string;
  fullname: string;
  email: string;
}
