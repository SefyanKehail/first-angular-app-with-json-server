import { Component } from '@angular/core';
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {

  // I will keep this one empty just to be redirected because I have my own toast working lol :p
  constructor() {
  }
}
