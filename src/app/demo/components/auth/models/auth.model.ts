export class AuthModel {
  authToken: string;
  refreshToken: string;
  expiresIn: Date;
  user_id:string;
  admin:boolean
  username:string

  setAuth(auth: AuthModel) {
    this.authToken = auth.authToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
  }
}
