import { Injectable } from '@angular/core';
import {jwtDecode, JwtPayload} from "jwt-decode";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class JWTService {

  constructor() { }

  decode(token: string){
    return jwtDecode(token);
  }
}
