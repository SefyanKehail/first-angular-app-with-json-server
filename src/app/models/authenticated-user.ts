export interface AuthenticatedUser {
  username: string;
  roles: string[];
  token: string;
}
