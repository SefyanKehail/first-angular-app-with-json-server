import {
  HttpErrorResponse, HttpEvent, HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {ChangeDetectorRef, Injectable} from '@angular/core';
import {LoadingService} from "../services/loading.service";
import {catchError, finalize, Observable, retry, throwError} from "rxjs";
import {ErrorService} from "../services/error.service";
import {ErrorEnum} from "../enums/error";
import {ToastService} from "../services/toast.service";
import {environment} from "../../environments/environment";

@Injectable()
export class SharedSpinnerInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService,
    private toastService: ToastService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();

    return next.handle(req).pipe(
      retry(2),
      finalize(() => this.loadingService.hide()),
      catchError((err: HttpErrorResponse) => {

        if ( req.url.includes(environment.host+"/products")){
          // probably have a switch case for each type of error to toast it accordingly but I'm just gonna hardcode it for now
          this.toastService.show();
          this.toastService.setMessage(ErrorEnum.FAILED_PRODUCTS_FETCH)
        }

        return throwError(() => err.message);
      })
    );
  }

}
