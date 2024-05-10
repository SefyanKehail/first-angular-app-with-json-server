import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {ToastService} from "../services/toast.service";

export const protectRouteFromAuthorizedUsersGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (! authService.checkPermissions(authService.getUser().roles, route.data['protectFrom'])
  ) {
    return true
  } else {
    router.navigate(['/home'])
    return false;
  }
};
