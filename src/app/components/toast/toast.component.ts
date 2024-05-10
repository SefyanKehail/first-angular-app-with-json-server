import {Component} from '@angular/core';
import {ToastService} from "../../services/toast.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

  // can extend this to have regular toasts not just errors;
  constructor(public toastService: ToastService) {
  }

}
