import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../models/user";
import {firstValueFrom} from "rxjs";
import {JWTService} from "./jwt.service";
import {Router} from "@angular/router";
import {AuthenticatedUser} from "../models/authenticated-user";
import {ErrorEnum} from "../enums/error";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private jwtService: JWTService,
    private router: Router
  ) {

  }


  // returns empty string if no user is matched
  async login(username: string, password: string) {
    try {
      // without firstValueFrom, await won't actually work on the expression because it resolves to an observable which is asynchronous by default, firstValueFrom turns it to promise
      const userMatched = await firstValueFrom(this.httpClient.get<User[]>(environment.host + `/users?username=${username}`));
      const user = userMatched[0]

      if (user) {
        const decodedJWT: any = this.jwtService.decode(user.token);


        if (decodedJWT.password === password) {

          sessionStorage.setItem('user', JSON.stringify({
            username: decodedJWT.username,
            roles: decodedJWT.roles,
            token: decodedJWT.token
          }))

          return Promise.resolve(true);
        } else {
          return Promise.reject(ErrorEnum.WRONG_CREDENTIALS);
        }

      } else {
        return Promise.reject(ErrorEnum.WRONG_CREDENTIALS)
      }
    } catch (e) {
      return Promise.reject(ErrorEnum.NETWORK_ERROR);
    }

  }

  checkAuth() {
    return sessionStorage.getItem('user') !== null;
  }

  getUser(): AuthenticatedUser {
    return JSON.parse(sessionStorage.getItem('user')!);
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login'])
  }

  checkPermissions(userRoles: string[], authorizedRoles: string[]) {
    // basically one of the user roles has to match one of the authorized roles
    return userRoles.some((userRole) => authorizedRoles.includes(userRole));
  }

  isAdmin(){
    return this.checkPermissions(this.getUser().roles, ["ADMIN"]);
  }
}
