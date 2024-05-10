import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";
import {LoadingService} from "./services/loading.service";
import {AppStateService} from "./services/app-state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  title = 'first-angular-app';

  constructor(private appStateService: AppStateService) {
  }

  ngOnInit() {
    this.appStateService.setRouteState();
  }

}
