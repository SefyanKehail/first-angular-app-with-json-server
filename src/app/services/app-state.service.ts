import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, filter, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productsState: any = {
    totalProducts: 0,
    totalChecked: 0,
  }

  private _currentRoute = new BehaviorSubject<string>("");
  public  currentRoute$ = this._currentRoute.asObservable();

  constructor(private router: Router) {
  }


  // object containing the states you want to change, valid states are: (totalProducts , totalChecked)
  setProductState(state: any) {
    this.productsState = {...this.productsState, ...state}
  }

  setRouteState() {
    this.router.events.pipe(
      filter( event => event instanceof NavigationEnd)
    ).subscribe(
      () => {
        this._currentRoute.next(this.router.url.split('/')[1])
      }
    )
  }

}


