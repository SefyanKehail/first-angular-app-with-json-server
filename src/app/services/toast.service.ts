import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _status = new BehaviorSubject<boolean>(false);
  status$ = this._status.asObservable();

  private _message = new BehaviorSubject("ToastError Message");
  message$ = this._message.asObservable();

  constructor() { }

  show(){
    this._status.next(true);
  }

  hide() {
    this._status.next(false)
  }

  setMessage(message: string){
    this._message.next(message);
  }
}
