import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {ToastService} from "../services/toast.service";

export const canDeactivateUnauthorizedGuard: CanActivateFn = (route, state) => {
  const toastService =  inject(ToastService);
  toastService.hide();
  return true;
};
