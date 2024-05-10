import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {ToastService} from "../services/toast.service";

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toastService = inject(ToastService);
  const router = inject(Router);



  if (authService.checkPermissions(authService.getUser().roles, route.data['authorizedRoles'])
  ) {
    return true
  } else {
    toastService.show();
    toastService.setMessage("You don't have the permission to perform this action");

    router.navigate(['/unauthorized'])
    return false;
  }
};
