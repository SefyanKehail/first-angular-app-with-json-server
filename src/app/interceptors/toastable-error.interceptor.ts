import {
  HttpErrorResponse, HttpEvent, HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {ChangeDetectorRef, Injectable} from '@angular/core';
import {LoadingService} from "../services/loading.service";
import {BehaviorSubject, catchError, finalize, map, Observable, retry, tap, throwError} from "rxjs";
import {ToastService} from "../services/toast.service";
import {ToastableError} from "../custom-errors/toastable-error";
import {environment} from "../../environments/environment";
import {AuthService} from "../services/auth.service";

@Injectable()
export class ToastableErrorInterceptor implements HttpInterceptor {


  constructor(private toastService: ToastService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    if(req.url.includes(environment.host+"/errors")){
      this.toastService.show();
      this.toastService.setMessage(req.params.get('message')!);
    } else {
      this.toastService.hide();
    }

    return next.handle(req);
  }

}
