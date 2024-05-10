import { Component } from '@angular/core';
import {AppStateService} from "../../services/app-state.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(public appStateService: AppStateService) {
  }
}
