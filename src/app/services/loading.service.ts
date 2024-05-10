import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loading = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this._loading.asObservable();

  constructor() {
  }

  hide() {
    this._loading.next(false);
  }

  // we make it the change asynchronous to avoid the change being applied AfterViewInit
  show() {
    Promise.resolve().then(() => this._loading.next(true));
  }
}
