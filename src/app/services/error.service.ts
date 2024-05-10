import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private httpClient: HttpClient) { }

  throwError(message: string){
    return this.httpClient.get<any>(environment.host + `/errors?message=${message}`, {params: {message: message}})
  }
}
